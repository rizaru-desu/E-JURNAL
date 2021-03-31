const express = require("express");
const app = express();
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
let port = process.env.PORT || 3000;

let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tim.sahabatalter@gmail.com",
    pass: "Alter123.",
  },
});

const serviceAccount = require("./service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("client"));

/**  API CREATE USER*/
app.post("/API-Create", function (req, res, next) {
  admin
    .auth()
    .createUser({
      email: req.body.email,
      emailVerified: false,
      password: req.body.password,
      displayName: req.body.displayName,
      disabled: false,
    })
    .then((userRecord) => {
      res.send({
        message: "Successfully created account: " + userRecord.email,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

/** SEND MAIN VERIFICATION AND FORGOT PASSWORD */
app.post("/reset", function (req, res) {
  const useremail = req.body.usergetEmail;
  admin
    .auth()
    .generatePasswordResetLink(useremail)
    .then((link) => {
      // Construct password reset email template, embed the link and send
      // using custom SMTP server.
      let mailOptions = {
        from: "Dont Reply <tim.sahabatalter@gmail.com>",
        to: useremail,
        subject: "Permintaan Reset Kata Sandi",
        html:
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width"> <!--[if !mso]><!--> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!--<![endif]--> <title></title> <!--[if !mso]><!--> <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"> <!--<![endif]--> <style type="text/css"> body { margin: 0; padding: 0; } table, td, tr { vertical-align: top; border-collapse: collapse; } * { line-height: inherit; } a[x-apple-data-detectors=true] { color: inherit !important; text-decoration: none !important; } </style> <style type="text/css" id="media-query"> @media (max-width: 520px) { .block-grid, .col { min-width: 320px !important; max-width: 100% !important; display: block !important; } .block-grid { width: 100% !important; } .col { width: 100% !important; } .col_cont { margin: 0 auto; } img.fullwidth, img.fullwidthOnMobile { max-width: 100% !important; } .no-stack .col { min-width: 0 !important; display: table-cell !important; } .no-stack.two-up .col { width: 50% !important; } .no-stack .col.num2 { width: 16.6% !important; } .no-stack .col.num3 { width: 25% !important; } .no-stack .col.num4 { width: 33% !important; } .no-stack .col.num5 { width: 41.6% !important; } .no-stack .col.num6 { width: 50% !important; } .no-stack .col.num7 { width: 58.3% !important; } .no-stack .col.num8 { width: 66.6% !important; } .no-stack .col.num9 { width: 75% !important; } .no-stack .col.num10 { width: 83.3% !important; } .video-block { max-width: none !important; } .mobile_hide { min-height: 0px; max-height: 0px; max-width: 0px; display: none; overflow: hidden; font-size: 0px; } .desktop_hide { display: block !important; max-height: none !important; } } </style> </head> <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"> <!--[if IE]><div class="ie-browser"><![endif]--> <table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#FFFFFF" valign="top"> <tbody> <tr style="vertical-align: top;" valign="top"> <td style="word-break: break-word; vertical-align: top;" valign="top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]--> <div style="background-color:transparent;"> <div class="block-grid " style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]--> <div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"> <div class="col_cont" style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--> <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth" align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/652120_634383/Untitled-1.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 200px; display: block;" width="200"> <!--[if mso]></td></tr></table><![endif]--> </div> <table cellpadding="0" cellspacing="0" role="presentation" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top"> <tr style="vertical-align: top;" valign="top"> <td style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px; text-align: center; width: 100%;" width="100%" align="center" valign="top"> <h1 style="color:#555555;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:23px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;"><strong>Selamat Datang di E-Jurnal</strong></h1> </td> </tr> </table> <!--[if (!mso)&(!IE)]><!--> </div> <!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div style="background-color:transparent;"> <div class="block-grid " style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]--> <div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"> <div class="col_cont" style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--> <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top"> <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top"> <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" align="center" role="presentation" valign="top"> <tbody> <tr style="vertical-align: top;" valign="top"> <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]--> <div style="color:#000000;font-family:\'Roboto\', Tahoma, Verdana, Segoe, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"> <div class="txtTinyMce-wrapper" style="line-height: 1.5; font-size: 12px; font-family: \'Roboto\', Tahoma, Verdana, Segoe, sans-serif; color: #000000; mso-line-height-alt: 18px;"> <p style="font-size: 24px; line-height: 1.5; text-align: justify; word-break: break-word; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 36px; margin: 0;"><span style="font-size: 24px;">Hei, Jika Anda meminta untuk mereset/mengatur ulang kata sandi. Cukup klik tombol merah besar di bawah ini.</span></p> </div> </div> <!--[if mso]></td></tr></table><![endif]--> <div class="button-container" align="center" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="' +
          link +
          '" style="height:33pt;width:173.25pt;v-text-anchor:middle;" arcsize="10%" strokeweight="0.75pt" strokecolor="#8a3b8f" fillcolor="#ff0000"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--> <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff0000;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #8a3b8f;border-right:1px solid #8a3b8f;border-bottom:1px solid #8a3b8f;border-left:1px solid #8a3b8f;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">RESET KATA SANDI</span></span></div> <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]--> </div> <!--[if (!mso)&(!IE)]><!--> </div> <!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--> </div> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> </td> </tr> </tbody> </table> <!--[if (IE)]></div><![endif]--> </body> </html>',
      };

      transport.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("email sent!!!!");
        }
      });

      res.send({
        data: useremail,
      });
      return sendCustomPasswordResetEmail(useremail, link);
    })
    .catch(function (error) {
      res.send(error.message);
    });
});

app.post("/verified", function (req, res) {
  const useremail = req.body.usergetEmail;
  admin
    .auth()
    .generateEmailVerificationLink(useremail)
    .then((link) => {
      // Construct email verification template, embed the link and send
      // using custom SMTP server.
      let mailOptions = {
        from: "Dont Reply <tim.sahabatalter@gmail.com>",
        to: useremail,
        subject: "Permintaan Verifikasi Email",
        html:
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width"> <!--[if !mso]><!--> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!--<![endif]--> <title></title> <!--[if !mso]><!--> <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"> <!--<![endif]--> <style type="text/css"> body { margin: 0; padding: 0; } table, td, tr { vertical-align: top; border-collapse: collapse; } * { line-height: inherit; } a[x-apple-data-detectors=true] { color: inherit !important; text-decoration: none !important; } </style> <style type="text/css" id="media-query"> @media (max-width: 520px) { .block-grid, .col { min-width: 320px !important; max-width: 100% !important; display: block !important; } .block-grid { width: 100% !important; } .col { width: 100% !important; } .col_cont { margin: 0 auto; } img.fullwidth, img.fullwidthOnMobile { max-width: 100% !important; } .no-stack .col { min-width: 0 !important; display: table-cell !important; } .no-stack.two-up .col { width: 50% !important; } .no-stack .col.num2 { width: 16.6% !important; } .no-stack .col.num3 { width: 25% !important; } .no-stack .col.num4 { width: 33% !important; } .no-stack .col.num5 { width: 41.6% !important; } .no-stack .col.num6 { width: 50% !important; } .no-stack .col.num7 { width: 58.3% !important; } .no-stack .col.num8 { width: 66.6% !important; } .no-stack .col.num9 { width: 75% !important; } .no-stack .col.num10 { width: 83.3% !important; } .video-block { max-width: none !important; } .mobile_hide { min-height: 0px; max-height: 0px; max-width: 0px; display: none; overflow: hidden; font-size: 0px; } .desktop_hide { display: block !important; max-height: none !important; } } </style> </head> <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"> <!--[if IE]><div class="ie-browser"><![endif]--> <table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#FFFFFF" valign="top"> <tbody> <tr style="vertical-align: top;" valign="top"> <td style="word-break: break-word; vertical-align: top;" valign="top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]--> <div style="background-color:transparent;"> <div class="block-grid " style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]--> <div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"> <div class="col_cont" style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--> <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth" align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/652120_634383/Untitled-1.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 200px; display: block;" width="200"> <!--[if mso]></td></tr></table><![endif]--> </div> <table cellpadding="0" cellspacing="0" role="presentation" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top"> <tr style="vertical-align: top;" valign="top"> <td style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px; text-align: center; width: 100%;" width="100%" align="center" valign="top"> <h1 style="color:#555555;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:23px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;"><strong>Selamat Datang di E-Jurnal</strong></h1> </td> </tr> </table> <!--[if (!mso)&(!IE)]><!--> </div> <!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div style="background-color:transparent;"> <div class="block-grid " style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"><div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"> <div class="col_cont" style="width:100% !important;">  <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">  <table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top"> <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top"> <table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" align="center" role="presentation" valign="top"> <tbody> <tr style="vertical-align: top;" valign="top"> <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td> </tr> </tbody> </table> </td> </tr> </tbody> </table><div style="color:#000000;font-family:\'Roboto\', Tahoma, Verdana, Segoe, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"> <div class="txtTinyMce-wrapper" style="line-height: 1.5; font-size: 12px; font-family: \'Roboto\', Tahoma, Verdana, Segoe, sans-serif; color: #000000; mso-line-height-alt: 18px;"> <p style="font-size: 24px; line-height: 1.5; text-align: justify; word-break: break-word; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 36px; margin: 0;"><span style="font-size: 24px;">Hei, Anda hampir siap untuk mulai menikmati E-jurnal. Cukup klik tombol merah besar di bawah untuk memverifikasi alamat email Anda</span></p> </div> </div> <div class="button-container" align="center" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><!--Button--> <center> <table align="center" cellspacing="0" cellpadding="0" width="100%"> <tr> <td align="center" style="padding: 10px;"> <table border="0" class="mobile-button" cellspacing="0" cellpadding="0"> <tr> <td align="center" bgcolor="#ff0000" style="background-color: #ff0000; margin: auto; max-width: 600px; -webkit-border-radius: 25px; -moz-border-radius: 25px; border-radius: 25px; padding: 15px 20px; " width="100%"> <!--[if mso]>&nbsp;<![endif]--> <a href="' +
          link +
          '" target="_blank" style="16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-weight:normal; text-align:center; background-color: #ff0000; text-decoration: none; border: none; -webkit-border-radius: 25px; -moz-border-radius: 25px; border-radius: 25px; display: inline-block;text-decoration:none;"> <span style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-weight:normal; line-height:1.5em; text-align:center;">VERIFIKASI EMAIL</span> </a> <!--[if mso]>&nbsp;<![endif]--> </td> </tr> </table> </td> </tr> </table> </center></div>',
      };

      transport.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("email sent!!!!");
        }
      });

      res.send({
        data: useremail,
      });
      return sendCustomVerificationEmail(useremail, link);
    })
    .catch(function (error) {
      res.send(error.message);
    });
});

app.listen(port, () => {
  console.log("Listening on port local");
});
