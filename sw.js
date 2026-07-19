// 크롬의 웹앱(PWA) 설치 필수 조건만 충족시키는 안전한 서비스 워커
self.addEventListener('install', (event) => {
    self.skipWaiting(); // 대기하지 않고 즉시 설치
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim()); // 즉시 제어권 확보
});

self.addEventListener('fetch', (event) => {
    // 크롬은 fetch 이벤트가 존재하기만 하면 PWA로 인정해줍니다.
    // 복잡한 파일 저장을 생략하여 에러로 인한 설치 실패를 원천 차단합니다.
    event.respondWith(
        fetch(event.request).catch(() => {
            return new Response("인터넷 연결이 필요합니다.");
        })
    );
});