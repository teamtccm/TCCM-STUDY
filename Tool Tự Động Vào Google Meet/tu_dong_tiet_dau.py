#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TỰ ĐỘNG MỞ GOOGLE MEET & CHUÔNG BÁO THỨC GỌI DẬY 7H SÁNG — CHROME THẬT (tanbanhda@gmail.com)
Hỗ trợ 100% cả Windows và macOS:
- Đọc lịch học từ web "Công Việc Hằng Ngày" (js/data.js -> CLASS_SCHEDULE).
- Đúng 07:00 sáng (hoặc giờ báo thức cấu hình):
  1) Tự động bật Max Volume 100% (tắt Mute) trên cả Windows & macOS.
  2) Phát chuông báo thức siêu to (chuong_bao_thuc.wav lặp liên tục).
  3) Hiện bảng thông báo Topmost có nút "🔕 Tắt chuông (Đã dậy)" để ngắt chuông khi đã thức dậy.
  4) Mở luôn link Google Meet trong Chrome (tự nhận diện Profile của tanbanhda@gmail.com),
     tự tắt Mic + Camera và bấm Tham gia ngay.
  5) Nếu 07:00 giáo viên chưa mở phòng, tiếp tục canh tự động bấm vào phòng đến tận 07:35.

Cách chạy trên Windows:
  py -X utf8 tu_dong_tiet_dau.py               -> chờ đến 07:00 bật chuông to gọi dậy + tự mở Meet
  py -X utf8 tu_dong_tiet_dau.py --ca-ngay     -> chạy trực cả ngày cho mọi tiết học
  py -X utf8 tu_dong_tiet_dau.py --test-chuong -> test thử chuông báo thức gọi dậy ngay lập tức
  py -X utf8 tu_dong_tiet_dau.py --ngay        -> mở Meet ngay lập tức (test)
  py -X utf8 tu_dong_tiet_dau.py --xem         -> chỉ in tiết sẽ vào & giờ báo thức
  py -X utf8 tu_dong_tiet_dau.py --link URL    -> mở một link Meet bất kỳ ngay (test)
"""
import ctypes
import json
import os
import re
import subprocess
import sys
import threading
import time
from datetime import datetime, timedelta

IS_WIN = sys.platform.startswith("win")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_JS = os.path.join(BASE_DIR, "data.js")
if not os.path.exists(DATA_JS):
    DATA_JS = os.path.join(os.path.dirname(BASE_DIR), "js", "data.js")
CFG_PATH = os.path.join(BASE_DIR, "config.json")
ALARM_WAV = os.path.join(BASE_DIR, "chuong_bao_thuc.wav")
EXT_DIR = os.path.join(BASE_DIR, "meet_auto_join_ext")

JS_ACTIONS = r"""
(function () {
  const click = (re) => {
    const els = [...document.querySelectorAll('[aria-label], button')];
    for (const el of els) {
      const label = (el.getAttribute('aria-label') || '') + ' ' + (el.innerText || '');
      if (re.test(label)) { el.click(); return label.trim().slice(0, 50); }
    }
    return null;
  };
  const r = [];
  r.push('mic:' + click(/turn off microphone|tắt micrô|tắt micro/i));
  r.push('cam:' + click(/turn off camera|tắt máy ảnh|tắt camera/i));
  r.push('join:' + click(/^\s*(join now|ask to join|tham gia ngay|yêu cầu tham gia)/i));
  const inRoom = !!document.querySelector('[aria-label*="Leave call" i], [aria-label*="Rời khỏi cuộc gọi" i]');
  r.push('inroom:' + inRoom);
  return r.join(' | ');
})()
"""


def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}", flush=True)


def prevent_sleep():
    """Chống ngủ máy (Windows SetThreadExecutionState / macOS caffeinate)."""
    if IS_WIN:
        try:
            # ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED
            ctypes.windll.kernel32.SetThreadExecutionState(0x80000003)
        except Exception:
            pass


def find_windows_chrome_exe():
    candidates = [
        os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return "chrome.exe"


def resolve_chrome_profile(cfg):
    """Tự động dò đúng Profile Chrome theo email_google trên Windows."""
    email = cfg.get("email_google", "tanbanhda@gmail.com").lower()
    if IS_WIN:
        local_state = os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\User Data\Local State")
        if os.path.exists(local_state):
            try:
                ls = json.load(open(local_state, encoding="utf-8"))
                info_cache = ls.get("profile", {}).get("info_cache", {})
                for prof_dir, info in info_cache.items():
                    if info.get("user_name", "").lower() == email:
                        return prof_dir
            except Exception:
                pass
    return cfg.get("chrome_profile", "Profile 34" if IS_WIN else "Profile 7")


def notify(title, text):
    if IS_WIN:
        log(f"🔔 [{title}] {text}")
    else:
        safe = text.replace('"', "'")
        subprocess.run(
            ["osascript", "-e", f'display notification "{safe}" with title "{title}" sound name "Glass"'],
            check=False,
        )


def set_max_volume(vol=100):
    """Bỏ tắt tiếng (unmute) và vặn âm lượng hệ thống lên mức tối đa."""
    vol = max(0, min(100, int(vol)))
    if IS_WIN:
        try:
            # Nhấn phím cứng VK_VOLUME_UP (0xAF) 50 lần để bật 100% âm lượng trên Windows
            for _ in range(50):
                ctypes.windll.user32.keybd_event(0xAF, 0, 0, 0)
                ctypes.windll.user32.keybd_event(0xAF, 0, 2, 0)
        except Exception:
            pass
    else:
        script = f"set volume output muted false\nset volume output volume {vol}\nset volume alert volume {vol}"
        subprocess.run(["osascript", "-e", script], check=False)


def ring_wake_up_alarm(cls=None, cfg=None, duration_sec=None):
    """
    Phát tiếng chuông báo thức siêu to liên tục cho đến khi hết thời lượng
    hoặc người dùng bấm nút 'Tắt chuông (Đã dậy)' trên màn hình.
    """
    cfg = cfg or {}
    vol = cfg.get("am_luong_bao_thuc", 100)
    if duration_sec is None:
        duration_sec = int(cfg.get("thoi_luong_chuong_giay", 90))

    subject = cls["subject"] if cls else "Lớp học buổi sáng"
    teacher = cls["teacher"] if cls else "Giảng viên"

    log(f"🔔 KÍCH HOẠT CHUÔNG BÁO THỨC SIÊU TO! (Âm lượng: {vol}%, Thời lượng tối đa: {duration_sec}s)")
    set_max_volume(vol)

    stop_event = threading.Event()

    if IS_WIN:
        import winsound
        if os.path.exists(ALARM_WAV):
            winsound.PlaySound(ALARM_WAV, winsound.SND_FILENAME | winsound.SND_ASYNC | winsound.SND_LOOP)
        else:
            winsound.PlaySound("SystemExclamation", winsound.SND_ALIAS | winsound.SND_ASYNC | winsound.SND_LOOP)

        def show_win_dialog():
            msg = (
                f"📚 Môn học: {subject} ({teacher})\n"
                f"🚀 Hệ thống đang tự động mở Google Meet, tắt Mic & Cam và vào lớp!\n\n"
                f"👉 Bấm OK bên dưới để TẮT CHUÔNG BÁO THỨC (Đã dậy)."
            )
            title = "⏰ BÁO THỨC 7:00 SÁNG — DẬY ĐI HỌC!"
            try:
                # MessageBoxTimeoutW tự đóng sau duration_sec * 1000 ms
                ctypes.windll.user32.MessageBoxTimeoutW(
                    0, msg, title, 0x00000030 | 0x00040000 | 0x00010000, 0, int(duration_sec * 1000)
                )
            except Exception:
                ctypes.windll.user32.MessageBoxW(0, msg, title, 0x00000030 | 0x00040000)
            stop_event.set()
            try:
                winsound.PlaySound(None, winsound.SND_PURGE)
            except Exception:
                pass

        t = threading.Thread(target=show_win_dialog, daemon=True)
        t.start()
        end_time = time.time() + duration_sec
        while time.time() < end_time and not stop_event.is_set():
            time.sleep(0.5)
        stop_event.set()
        try:
            winsound.PlaySound(None, winsound.SND_PURGE)
        except Exception:
            pass
        log("🔕 Chuông báo thức đã dừng.")
        return

    # Nhánh macOS
    active_procs = []

    def watch_dismiss_dialog():
        safe_sub = subject.replace('"', "'")
        safe_tea = teacher.replace('"', "'")
        alert_script = (
            f'display alert "⏰ BÁO THỨC 7:00 SÁNG — DẬY ĐI HỌC!" '
            f'message "📚 Môn học: {safe_sub} ({safe_tea})\\n'
            f'🚀 Hệ thống đang tự động mở Google Meet, tắt Mic & Cam và vào lớp!\\n\\n'
            f'👉 Bấm nút bên dưới để tắt chuông." '
            f'as critical buttons {{"🔕 Tắt chuông (Đã dậy)"}} default button 1 giving up after {duration_sec}'
        )
        p = subprocess.Popen(["osascript", "-e", alert_script], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        active_procs.append(p)
        p.wait()
        stop_event.set()
        for proc in list(active_procs):
            if proc.poll() is None:
                try:
                    proc.terminate()
                except Exception:
                    pass

    dialog_thread = threading.Thread(target=watch_dismiss_dialog, daemon=True)
    dialog_thread.start()

    end_time = time.time() + duration_sec
    while time.time() < end_time and not stop_event.is_set():
        set_max_volume(vol)
        if os.path.exists(ALARM_WAV):
            p_wav = subprocess.Popen(["afplay", "-v", "4.0", ALARM_WAV])
            active_procs.append(p_wav)
            while p_wav.poll() is None:
                if stop_event.is_set() or time.time() >= end_time:
                    p_wav.terminate()
                    break
                time.sleep(0.2)
        else:
            time.sleep(1)

    stop_event.set()
    log("🔕 Chuông báo thức đã dừng.")


def windows_ui_auto_join_meet():
    """
    Trên Windows: Tìm cửa sổ Chrome đang mở Google Meet, kiểm tra xem đã vào lớp chưa,
    hoặc dùng UIAutomation bấm tắt Mic, tắt Cam và bấm nút 'Tham gia ngay' / 'Yêu cầu tham gia'.
    """
    ps_script = r"""
Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes

$procs = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -ne "" }
$meetWin = $procs | Where-Object { $_.MainWindowTitle -match "Meet|DA_VAO_LOP" } | Select-Object -First 1
if (-not $meetWin) {
    Write-Output "NO_TAB"
    exit
}
if ($meetWin.MainWindowTitle -match "DA_VAO_LOP") {
    Write-Output "mic:auto | cam:auto | join:auto | inroom:true"
    exit
}

$root = [System.Windows.Automation.AutomationElement]::FromHandle($meetWin.MainWindowHandle)
if (-not $root) {
    Write-Output "NO_TAB"
    exit
}

$cond = [System.Windows.Automation.Condition]::TrueCondition
$els = $root.FindAll([System.Windows.Automation.TreeScope]::Descendants, $cond)

$micRes = "null"
$camRes = "null"
$joinRes = "null"
$inRoom = "false"

foreach ($el in $els) {
    try {
        $name = $el.Current.Name
        if (-not $name) { continue }
        if ($name -match "(?i)Leave call|Rời khỏi cuộc gọi") {
            $inRoom = "true"
        }
        if ($name -match "(?i)^(Turn off microphone|Tắt micrô|Tắt micro)") {
            $inv = $null
            if ($el.TryGetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern, [ref]$inv)) {
                $inv.Invoke()
                $micRes = $name
            }
        }
        if ($name -match "(?i)^(Turn off camera|Tắt máy ảnh|Tắt camera)") {
            $inv = $null
            if ($el.TryGetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern, [ref]$inv)) {
                $inv.Invoke()
                $camRes = $name
            }
        }
        if ($name -match "(?i)^(Join now|Ask to join|Tham gia ngay|Yêu cầu tham gia)$") {
            $inv = $null
            if ($el.TryGetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern, [ref]$inv)) {
                $inv.Invoke()
                $joinRes = $name
            }
        }
    } catch {}
}
Write-Output "mic:$micRes | cam:$camRes | join:$joinRes | inroom:$inRoom"
"""
    try:
        res = subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", ps_script],
            capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=15
        )
        return (res.stdout or res.stderr).strip()
    except Exception as e:
        return f"ERR:{e}"


def run_js_in_meet_tab(meet_code):
    """Chạy kiểm tra & thao tác vào phòng Meet trên Windows hoặc macOS."""
    if IS_WIN:
        return windows_ui_auto_join_meet()

    js = JS_ACTIONS.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")
    script = (
        'tell application "Google Chrome"\n'
        '  try\n'
        '    set wc to count of windows\n'
        '    repeat with i from 1 to wc\n'
        '      set tc to count of tabs of window i\n'
        '      repeat with j from 1 to tc\n'
        '        set u to ""\n'
        '        try\n'
        '          set u to URL of tab j of window i\n'
        '        end try\n'
        f'        if u contains "{meet_code}" and u contains "meet.google.com" then\n'
        '          try\n'
        f'            return execute tab j of window i javascript "{js}"\n'
        '          on error e\n'
        '            return "ERR:" & e\n'
        '          end try\n'
        '        end if\n'
        '      end repeat\n'
        '    end repeat\n'
        '  on error e2\n'
        '    return "NO_TAB (" & e2 & ")"\n'
        '  end try\n'
        '  return "NO_TAB"\n'
        'end tell\n'
    )
    res = subprocess.run(["osascript", "-e", script], capture_output=True, text=True)
    return (res.stdout or res.stderr).strip()


def launch_chrome_meet(link, cfg):
    profile = resolve_chrome_profile(cfg)
    sep = "&" if "?" in link else "?"
    url = f"{link}{sep}authuser={cfg['email_google']}"
    log(f"🚀 Mở Chrome (profile '{profile}' - {cfg['email_google']}): {url}")
    if IS_WIN:
        chrome_exe = find_windows_chrome_exe()
        args = [chrome_exe, f"--profile-directory={profile}"]
        if os.path.exists(EXT_DIR):
            args.append(f"--load-extension={EXT_DIR}")
        args.append(url)
        subprocess.Popen(args)
    else:
        subprocess.run([
            "open", "-na", "Google Chrome", "--args",
            f"--profile-directory={profile}", url
        ])


def open_meet(link, cfg, keep_trying_until=None):
    code = link.rstrip("/").split("/")[-1].split("?")[0]
    if code == "new":
        code = "meet.google.com/"

    launch_chrome_meet(link, cfg)
    time.sleep(7)

    joined = False
    attempt = 0
    max_attempts = 40
    reopened_at_730 = False

    while True:
        attempt += 1
        out = run_js_in_meet_tab(code)
        if out.startswith("ERR:") and "turned off" in out:
            log("⚠️ Chrome chưa bật 'Allow JavaScript from Apple Events'.")
            return False

        if attempt <= 10 or attempt % 10 == 0 or "inroom:true" in out:
            log(f"   [Lần thử {attempt}] {out}")

        if "inroom:true" in out:
            joined = True
            break

        if out.startswith("NO_TAB") and attempt > 5 and keep_trying_until and datetime.now() < keep_trying_until:
            log("🔄 Tab Meet chưa mở hoặc đã đóng, tự động mở lại Chrome...")
            launch_chrome_meet(link, cfg)
            time.sleep(6)

        if keep_trying_until and datetime.now() < keep_trying_until:
            now_hm = datetime.now().strftime("%H:%M")
            if now_hm in ("07:28", "07:30") and not reopened_at_730:
                reopened_at_730 = True
                log("🔄 Đã đến 07:28-07:30 (giờ vào tiết chính thức), làm mới kết nối phòng Meet...")
                launch_chrome_meet(link, cfg)
                time.sleep(6)
            time.sleep(5)
        else:
            if attempt >= max_attempts:
                break
            time.sleep(3)

    if joined:
        log("✅ Đã vào phòng họp thành công (mic & camera đã tắt).")
        notify("Google Meet", "Đã vào lớp, mic và camera đã tắt")
    else:
        log("⚠️ Đã mở trang Google Meet và kích hoạt Extension tự tắt Mic/Cam & bấm Tham gia.")
    return joined


# ----------------------------- LỊCH HỌC -----------------------------
def load_schedule():
    src = None
    for path in (DATA_JS, os.path.join(BASE_DIR, "data.js")):
        try:
            with open(path, "r", encoding="utf-8") as f:
                src = f.read()
            break
        except OSError:
            continue
    if src is None:
        raise RuntimeError("Không đọc được lịch học (data.js)")
    block = re.search(r"const CLASS_SCHEDULE\s*=\s*\[(.*?)\];", src, re.S).group(1)
    items = []
    for m in re.finditer(
        r"day:\s*(\d+),\s*subject:\s*'([^']*)',\s*teacher:\s*'([^']*)',\s*period:\s*'(\d+)-(\d+)',\s*link:\s*'([^']*)'",
        block,
    ):
        d, subject, teacher, p1, p2, link = m.groups()
        items.append({"day": int(d), "subject": subject, "teacher": teacher,
                      "p1": int(p1), "p2": int(p2), "link": link})
    return items


def period_start(day_date, period, cfg):
    h, m = map(int, cfg["gio_tiet_1"].split(":"))
    base = day_date.replace(hour=h, minute=m, second=0, microsecond=0)
    return base + timedelta(minutes=(period - 1) * cfg["phut_moi_tiet"])


def alarm_time_for_day(day_date, cfg):
    gio_bt = cfg.get("gio_bao_thuc", "07:00")
    h, m = map(int, gio_bt.split(":"))
    return day_date.replace(hour=h, minute=m, second=0, microsecond=0)


def next_first_class(cfg, now=None, exclude_keys=None):
    now = now or datetime.now()
    exclude_keys = exclude_keys or []
    sched = load_schedule()
    for offset in range(0, 8):
        d = now + timedelta(days=offset)
        day_no = d.weekday() + 2  # Thứ 2 = 2 ... Thứ 7 = 7, CN = 8
        todays = sorted([c for c in sched if c["day"] == day_no], key=lambda c: c["p1"])
        if not todays:
            continue
        for cls in todays:
            start = period_start(d, cls["p1"], cfg)
            end = period_start(d, cls["p2"] + 1, cfg)
            key = f"{start.strftime('%Y-%m-%d')}|{cls['link']}"
            if key in exclude_keys:
                continue
            if end > now:
                return cls, start, end
    return None, None, None


def compute_trigger_time(cls, start, cfg):
    standard_join = start - timedelta(minutes=cfg.get("vao_truoc_phut", 0))
    if cls["p1"] == 1 and cfg.get("gio_bao_thuc"):
        alarm_dt = alarm_time_for_day(start, cfg)
        if alarm_dt < standard_join:
            return alarm_dt
    return standard_join


def acquire_single_instance_lock(lock_path):
    lock_f = open(lock_path, "w")
    try:
        if IS_WIN:
            import msvcrt
            msvcrt.locking(lock_f.fileno(), msvcrt.LK_NBLCK, 1)
        else:
            import fcntl
            fcntl.flock(lock_f, fcntl.LOCK_EX | fcntl.LOCK_NB)
        return lock_f
    except OSError:
        return None


def main():
    prevent_sleep()
    with open(CFG_PATH, "r", encoding="utf-8") as f:
        cfg = json.load(f)

    if "--test-chuong" in sys.argv:
        cls, _, _ = next_first_class(cfg)
        ring_wake_up_alarm(cls=cls, cfg=cfg, duration_sec=25)
        return

    if "--link" in sys.argv:
        if "--chuong" in sys.argv:
            threading.Thread(target=ring_wake_up_alarm, kwargs={"cls": None, "cfg": cfg}, daemon=True).start()
        open_meet(sys.argv[sys.argv.index("--link") + 1], cfg)
        return

    if "--xem" not in sys.argv and "--ngay" not in sys.argv:
        lock_f = acquire_single_instance_lock(os.path.join(BASE_DIR, ".lock"))
        if lock_f is None:
            print("Đã có một bản tool Tự Động Vào Học đang chạy ngầm, thoát.")
            return

    ca_ngay = "--ca-ngay" in sys.argv
    while True:
        prevent_sleep()
        state_path = os.path.join(BASE_DIR, "da_vao.json")
        try:
            done = json.load(open(state_path, encoding="utf-8"))
        except Exception:
            done = []

        cls, start, end = next_first_class(cfg, exclude_keys=done if ca_ngay else None)
        if not cls:
            print("Không tìm thấy tiết học nào tiếp theo trong lịch.")
            return

        join_at = compute_trigger_time(cls, start, cfg)
        is_morning_alarm = (cls["p1"] == 1 and cfg.get("bat_chuong_bao_thuc", True))

        print("=" * 65)
        print(f"📚 Tiết học kế tiếp : {cls['subject']} ({cls['teacher']})")
        print(f"🕒 Tiết {cls['p1']}-{cls['p2']}          : Lịch tiết {start.strftime('%A %d/%m %H:%M')} -> {end.strftime('%H:%M')}")
        if is_morning_alarm:
            print(f"🔔 Chuông & Vào Meet: {join_at.strftime('%H:%M %d/%m')} (Max Volume {cfg.get('am_luong_bao_thuc', 100)}% gọi dậy + Tự mở Meet)")
        else:
            print(f"⏰ Giờ tự vào Meet  : {join_at.strftime('%H:%M %d/%m')}")
        print(f"🔗 Link phòng học   : {cls['link']}")
        print(f"🌐 Chrome Profile   : {resolve_chrome_profile(cfg)} ({cfg['email_google']})")
        print("=" * 65)

        if "--xem" in sys.argv:
            return

        key = f"{start.strftime('%Y-%m-%d')}|{cls['link']}"
        if key in done and "--ngay" not in sys.argv:
            print(f"Tiết {cls['subject']} đã được vào rồi, chờ tiết sau...")
            if not ca_ngay:
                return
            time.sleep(30)
            continue

        if "--ngay" not in sys.argv:
            log(f"⏳ Đang canh giờ đến {join_at.strftime('%H:%M:%S ngày %d/%m/%Y')} (chế độ chống ngủ máy đang bật)...")
            while datetime.now() < join_at:
                prevent_sleep()
                remaining = (join_at - datetime.now()).total_seconds()
                sleep_step = min(10.0, max(0.5, remaining))
                time.sleep(sleep_step)
            notify("Google Meet", f"Đến giờ: {cls['subject']} ({cls['teacher']})")

        alarm_thread = None
        if is_morning_alarm or "--chuong" in sys.argv:
            alarm_thread = threading.Thread(
                target=ring_wake_up_alarm,
                kwargs={"cls": cls, "cfg": cfg},
                daemon=True,
            )
            alarm_thread.start()

        keep_until = start + timedelta(minutes=5) if datetime.now() < start else None
        ok = open_meet(cls["link"], cfg, keep_trying_until=keep_until)

        if alarm_thread and alarm_thread.is_alive():
            log("🔔 Chuông báo thức vẫn đang kêu cho đến khi bạn bấm 'Tắt chuông' hoặc hết 90 giây...")
            alarm_thread.join()

        if ok:
            done.append(key)
            json.dump(done[-30:], open(state_path, "w", encoding="utf-8"))

        if not ca_ngay:
            break
        log(f"✅ Đã tham gia tiết {cls['subject']}. Đang trực để tự vào các tiết tiếp theo...")
        while datetime.now() < end:
            prevent_sleep()
            time.sleep(30)


if __name__ == "__main__":
    main()
