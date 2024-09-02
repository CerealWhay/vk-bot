const { VK } = require('vk-io');
const { HearManager } = require('@vk-io/hear');

const vk = new VK({
    token: "vk1.a.rnhMfO8k0vKq3QH7r82X4hhuGND4Xez9Su__EjVAuRx4xzUoookZJfA1tsviqsZ6ZQzOSqhoqxZsT9rurUcTJ2qFFhKC3fXPQo7bd3z--CSl_RfNOL2C-tE4wWIHH_J0fFkyhUgGMLfaINmk3K6uSixlB-tlDRDwl5SD4h29I-eYn9rBiMYp0HsaEE_jkV70HTqtVCn3D-TspJfOGWhtyg"
});

const hearManager = new HearManager();

vk.updates.on('message_new', (context, next) => {
    console.log(context);
    // console.log(context.attachments[0].isTranscriptDone());
    hearManager.middleware(context, next);
});

hearManager.hear(['/time', '/date'], async (context) => {
    await context.send(String(new Date()));
});

vk.updates.start().catch(console.error);


async function run() {
    const msg = await vk.api.call('messages.getById', {
        message_ids: "25",
    });

    console.log(msg.items[0].attachments)
}

run().catch(console.log);

