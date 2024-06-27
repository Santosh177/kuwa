  function initFreshChat() {
    window.fcWidget.init({
      	 token: "70189850-832b-4a53-ae2d-b2d0e1a57adb",
	 host: "https://feelvaleo-371220369404109218.freshchat.com",
	 widgetUuid: "184fdd44-b64c-41f1-963c-1adaefc6103f"
    });
  }
  function initialize(i,t){var e;i.getElementById(t)?
  initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,
  e.src="https://feelvaleo-371220369404109218.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}
  function initiateCall(){initialize(document,"Freshchat-js-sdk")}
  initiateCall()


