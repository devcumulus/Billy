//담당장 : 박준서
import { Client } from "@stomp/stompjs";

const client = new Client({
  brokerURL: "ws://localhost:8080/ws-endpoint",
  reconnectDelay: 5000,
});

client.onConnect = function () {
  console.log("Stomp 클라이언트와 웹소켓 연결이 열렸습니다.");
  // 구독 설정 등의 작업을 수행할 수 있습니다.
};

client.onStompError = function (frame) {
  console.error("Stomp 오류:", frame.headers["message"]);
};

client.activate();

// 메시지를 서버로 전송
function sendMessage(message) {
  client.publish({ destination: "/app/send-message", body: message });
}

// 특정 주제를 구독
client.subscribe("/topic/greetings", function (message) {
  console.log("서버로부터 메시지를 받았습니다:", message.body);
});
