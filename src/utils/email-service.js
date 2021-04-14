import emailjs from 'emailjs-com';

export const sendMail = form => {

    console.log('entrou')
    emailjs.sendForm('service_sijp3it', 'template_v4wyes2', form, 'user_OByWmLBYYUNd6TeliICaD')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
}

