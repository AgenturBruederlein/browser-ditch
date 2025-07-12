// open-in-browser.js
(async () => {
  const apiKey = "ABC-123-TESTKEY"; // <- ersetzen durch Key des Kunden
  const currentDomain = window.location.hostname;
  const allowed = [
    { key: "ABC-123-TESTKEY", domain: "meinshop.de" },
    { key: "XYZ-789-DEMO", domain: "demo-store.de" }
  ];

  const isValid = allowed.some(entry =>
    entry.key === apiKey && entry.domain === currentDomain
  );
  if (!isValid) return;

  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const inApp = /FBAN|FBAV|Instagram|Line|LinkedIn|TikTok/i.test(ua);

  if (inApp) {
    const url = window.location.href;
    if (/iPhone|iPad|iPod/i.test(ua)) {
      window.location = `x-web-search://?url=${encodeURIComponent(url)}`;
      setTimeout(() => {
        window.location = `googlechrome://navigate?url=${encodeURIComponent(url)}`;
      }, 150);
    } else if (/Android/i.test(ua)) {
      window.location = `intent://${url.replace(/^https?:\/\//, "")}#Intent;package=com.android.chrome;scheme=https;end`;
    }
  }
})();
