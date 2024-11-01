import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OtpService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(email: string, userId: number, code: string) {
        const confirmationUrl = `http://localhost:3000/auth/confirm?userId=${userId}&code=${code}`
        await this.mailerService.sendMail({
            to: email,
            subject: 'Account Verification',
            context: {
                code
            },
            text: `Please confirm your account by clicking the following link: ${confirmationUrl}`,
            html: `<p>Please confirm your account by clicking the following link:</p>
                   <a href="${confirmationUrl}">Confirm your account</a>`
        })
    }
}
