# Information still needed

Most of the site is filled in from the resume. These items are still missing or need confirming. All text lives in `js/content.js`.

## Turn on the contact form (needed once)
The email button opens a pop-up that sends messages and attachments to your Gmail through `api/contact.js`.
Until these steps are done, the pop-up tells visitors to use their own email app instead.

- [ ] **2-Step Verification:** turn it on for arianjanderabergas@gmail.com (myaccount.google.com, Security). App Passwords need it.
- [ ] **App Password:** go to myaccount.google.com/apppasswords, create one named "Portfolio", and copy the 16-letter code. Keep it private.
- [ ] **Vercel settings:** in your project, Settings, Environment Variables, add `GMAIL_USER` = `arianjanderabergas@gmail.com` and `GMAIL_APP_PASSWORD` = the 16-letter code.
- [ ] **Redeploy:** push a commit, or in Vercel open Deployments and choose Redeploy, so the new settings take effect.
- [ ] **Test:** on the live site, send yourself a message with a small attachment and check your inbox.

## Please confirm
- [ ] **Graduation year:** the site says "Expected 2027" (it was marked unconfirmed on the resume)

## Optional, makes the site stronger
- [ ] **Project screenshots:** save in `assets/` and set each project's `image`
- [ ] **Microsoft Excel and Access certificate:** removed for now. To add it back, put it in `achievements` in `js/content.js` with its date, provider and picture.
- [ ] **More seminars or awards:** add them to `seminars` or `achievements` in `js/content.js`
- [ ] **Campus Event Hub link:** the repo is private, so the card has no link. Add one if you make it public or host a live demo.
