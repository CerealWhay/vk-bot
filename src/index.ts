import {AttachmentType, VK} from 'vk-io';

class VkTest {
    private vk: VK;
    private stackIds: number[];

    constructor() {
        this.vk = new VK({
            token: "vk1.a.rnhMfO8k0vKq3QH7r82X4hhuGND4Xez9Su__EjVAuRx4xzUoookZJfA1tsviqsZ6ZQzOSqhoqxZsT9rurUcTJ2qFFhKC3fXPQo7bd3z--CSl_RfNOL2C-tE4wWIHH_J0fFkyhUgGMLfaINmk3K6uSixlB-tlDRDwl5SD4h29I-eYn9rBiMYp0HsaEE_jkV70HTqtVCn3D-TspJfOGWhtyg"
        });

        this.stackIds = []

        this.init();
        setInterval(this.getMessages.bind(this), 1000);
    }

    init() {
        this.vk.updates.on('message_new', async (context) => {
            console.log(context.id);
            if (context.hasAllAttachments(AttachmentType.AUDIO_MESSAGE)) {
                this.stackIds = [...this.stackIds, context.id];
            }
        });

        this.vk.updates.start().catch(console.error);
    }

    async getMessages() {
        for (const id of this.stackIds) {
            const msg = await this.vk.api.messages.getById({
                message_ids: id,
            })

            msg.items.forEach((item) => {
                item.attachments.forEach((attachment) => {
                    if (attachment.audio_message.transcript_state === "done") {
                        this.stackIds = this.stackIds.filter((stackId) => stackId !== id);
                        console.log(`transcript of messageId = ${id} is "${attachment.audio_message.transcript}"`);
                        this.sendMessage(attachment.audio_message.owner_id, attachment.audio_message.transcript);
                    }
                })
            })
        }
    }

    async sendMessage(user_id: number, message: string) {
        await this.vk.api.messages.send({
            random_id: Math.floor(Math.random() * 100),
            user_id,
            message
        })
    }
}

new VkTest();
