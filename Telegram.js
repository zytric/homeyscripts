// Use the following to send message thourgh telegram:
// await sendMessage("Hello you! 😃");
// Prerequiste: https://apps.athom.com/app/org.telegram.api.bot

async function sendMessage(message) {
    let appId = "org.telegram.api.bot";
    let telegram = await Homey.apps.getApp({ id: appId });
    let settings = await Homey.apps.getAppSettings({ id: appId });
    let chat_id = settings.chat_ids[0].chat_id;
    return await telegram.apiGet("/send_message/", { to: chat_id, text: message });
}
