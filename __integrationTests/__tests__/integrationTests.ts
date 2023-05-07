import mqtt, { IPublishPacket, ISubscriptionGrant } from "mqtt";
import fetch from "node-fetch";

test('integration test', () => {
  expect(1+1).toBe(2);
});


test("connet to mqtt", (done:jest.DoneCallback)=>{
  const mqttBroker = "mqtt://localhost";
  const mqttClient = mqtt.connect(mqttBroker);
  mqttClient.on("connect", ()=>{
    console.log("connected");
    mqttClient.end();
    done();
  });
  
}, 5*1000);


test("wait for emulator", async ():Promise<void>=>{

  const res = await fetch("http://localhost:3000");
  const text = await res.text();
  expect(text ).toContain("echonet-lite-kaden-emulator");
}, 10*1000);


