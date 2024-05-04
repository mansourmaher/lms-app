"use client";
import { useParams } from "next/navigation";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import { Button } from "@/components/ui/button";
import { sendMessageofthestream } from "@/actions/conversation/sendmessageofstream";
import React, { useEffect } from "react";
import { istheuseristheownerofthemeeting } from "@/actions/system/istheuseristheownerofthemeeting";
import { theteacheristheownerofthemeet } from "@/actions/system/theteacheristheownerofthemeet";
import { closeMeeting } from "@/actions/system/closemeeting";

const RoomPage = () => {
  const { roomId } = useParams();
  const id = roomId;
  const link = window.location.href;

  const sendmessage = async () => {
    await sendMessageofthestream(id as string, link);
  };
  const handelclosetheMeeting = async () => {
    await closeMeeting(id as string);
    window.location.href = "/";
  };
  const [isowner, setisowner] = React.useState(false);
  const [isthetheteacherforprivatemeet, setisthetheteacherforprivatemeet] =
    React.useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await istheuseristheownerofthemeeting(id as string);
      const res2 = await theteacheristheownerofthemeet(id as string);
      setisthetheteacherforprivatemeet(res2);
      setisowner(res);
    };
    fetchdata();
  }, [id]);

  function randomID(len: any) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  function getUrlParams(url = window.location.href) {
    let urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
  }
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let role_str = getUrlParams(window.location.href).get("role") || "Host";
  const role =
    role_str === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str === "Cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks: any = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: "Join as co-host",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "/" +
        roomID,
    });
  }
  sharedLinks.push({
    name: "Join as audience",
    url:
      window.location.protocol + "//" + window.location.host + "room/" + roomID,
  });
  //http://localhost:3000/room/547852
  //http://localhost:3000/meet?roomID=lIV8U&role=Audience

  async function init(element: any) {
    const appId = 501103974;
    const serverSecret = "e405c1b30cdf5ea92efbbe098f8a8e54";
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      "mmmmm",
      v4(),
      "user1"
    );

    const ui = ZegoUIKitPrebuilt.create(KitToken);

    ui.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
        config: {
          role,
        },
      },
      sharedLinks,
    });
  }

  return (
    <div className="flex justify-start items-center">
      <div className="w-full h-screen" ref={init}>
        <div className="w-full h-full"></div>
      </div>
      {isthetheteacherforprivatemeet && (
        <Button
          variant={"primary"}
          onClick={() => {
            sendmessage();
          }}
        >
          Share the meeting
        </Button>
      )}

      {isowner && (
        <div className="flex flex-col items-center space-y-2">
          <Button
            variant={"green"}
            onClick={() => {
              handelclosetheMeeting();
            }}
          >
            Finish the meeting
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomPage;
