import mqtt, { IPublishPacket, ISubscriptionGrant } from "mqtt";
import fetch from "node-fetch";
import Timeout from 'await-timeout';


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

test("connet to mqtt", async ():Promise<void>=>{
  const mqttBroker = mqttServer;
  const mqttClient = mqtt.connect(mqttBroker);

  const timer = new Timeout();
  try
  {
    await Promise.race([
      new Promise<void>((resolve, rejects)=>{
        mqttClient.on("connect", ()=>{
          console.log("connected");
          mqttClient.end();
          resolve();
        });
      }),
      timer.set(5000, "timeout")
    ]);
  }
  finally
  {
    mqttClient.end();
  }
}, 10*1000);


test("wait for emulator", async ():Promise<void>=>{

  const res = await fetch(emurator);
  const text = await res.text();
  expect(text ).toContain("echonet-lite-kaden-emulator");
});


