import emailjs from 'emailjs-com';

export const sendMail = form => {
    return emailjs.sendForm('service_sijp3it', 'template_v4wyes2', form, 'user_OByWmLBYYUNd6TeliICaD');
}

