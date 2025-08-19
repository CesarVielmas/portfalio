import { SendEmailDto } from '@app/core/services/gmail-api.service';
import { Request, Response } from 'express';
import { google } from 'googleapis';

export const gmailRoutes = [
  {
    path: '/api/gmailMe/send',
    method: 'post',
    handler: async (req: Request, res: Response) => {
      try {
        const contentMail:SendEmailDto = req.body;
        if (!contentMail.subject && !contentMail.to && (!contentMail.text || !contentMail.html)){res.status(400).send('Payload inválido')};
        const oauth2Client = new google.auth.OAuth2(
          process.env['GOOGLE_CLIENT_ID'],
          process.env['GOOGLE_CLIENT_SECRET'],
          process.env['GOOGLE_REDIRECT_URI']
        );
        const scope = process.env['GOOGLE_GMAIL_SCOPE'];
        oauth2Client.setCredentials({ refresh_token: process.env['GOOGLE_REFRESH_TOKEN'] });
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
        const message = [
          `From:${contentMail.fromName ?? 'person'} <${contentMail.fromEmail ?? 'johndear@example.com'}>`,
          `To: ${contentMail.to}`,
          `Subject: ${contentMail.subject}`,
          '',
          contentMail.html ?? contentMail.text ?? 'nothing here'
        ].join('\n');
        const encodedMessage = Buffer.from(message)
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
        const result = await gmail.users.messages.send({
          userId: 'me',
          requestBody: { raw: encodedMessage },
        });
        res.json({ success:true });
      } catch (err: any) {
        console.error('Gmail send error:', err?.response?.data ?? err);
        res.status(500).json({ sucess:false });
      }
    }
  }
];
