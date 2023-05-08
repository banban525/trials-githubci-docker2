import mqtt, { IPublishPacket, ISubscriptionGrant } from "mqtt";
import fetch from "node-fetch";


let mqttServer = "mqtt://localhost"
if("mqttserver" in process.env && process.env.mqttserver !== undefined)
{
  mqttServer = process.env.mqttserver;
}
let emurator = "http://localhost:3000"
if("emurator" in process.env && process.env.emurator !== undefined)
{
  emurator = process.env.emurator;
}


test('integration test', () => {
  expect(1+1).toBe(2);
});

test("connet to mqtt", (done:jest.DoneCallback)=>{
  const mqttBroker = mqttServer;
  const mqttClient = mqtt.connect(mqttBroker);
  mqttClient.on("connect", ()=>{
    console.log("connected");
    mqttClient.end();
    done();
  });
  
});


test("wait for emulator", async ():Promise<void>=>{

  const res = await fetch(emurator);
  const text = await res.text();
  expect(text ).toContain("echonet-lite-kaden-emulator");
});


