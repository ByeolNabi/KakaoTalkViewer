const { chatDataParser } = require("./chatParser");
const fs = require("fs");

const cp = new chatDataParser();
let chatData = cp.start(__dirname + "/datas");
chatData = JSON.stringify(chatData);

fs.writeFileSync(__dirname + "/result.txt", chatData);
