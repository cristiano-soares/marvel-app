import React, { useState, useEffect } from 'react';
import { sendMail } from '../../utils/email-service';
import { Loader } from '../Loader';
import './styles.scss';

export function EmailForm({ onCancelSendMail, mailContent }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        const emailInput = document.getElementById('email');
        if (!emailInput) {
            return;
        }
        emailInput.focus();
    });

    const handleSendMail = () => {
        setLoading(true);
        // Este form é necessário para o serviço de e-mail utilizado
        const form = document.getElementById('emailForm');
        sendMail(form, email).then(() => {
            setLoading(false);
            setEmailSent(true);
        });
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    return (
        <>
            {
                loading && (
                    <Loader></Loader>
                )
            }
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Enviar quadrinhos para o e-mail</h2>
                    </div>
                    <div className="modal-body">
                        {
                            !emailSent &&
                            (
                                <form id="emailForm" className="mail-form">
                                    <input id="email" type="email" name="user_email" placeholder="Digite seu e-mail aqui" value={email} onChange={handleEmailChange} />
                                    <textarea name="message" value={mailContent}></textarea>
                                </form>
                            )
                        }
                        {
                            emailSent && (
                                <p>Seu e-mail foi enviado com sucesso!</p>
                            )
                        }
                    </div>
                    <div className="modal-footer">
                        {
                            !emailSent && (
                                <button type="button" onClick={handleSendMail}>Enviar</button>
                            )
                        }
                        <button type="button" onClick={onCancelSendMail}>{emailSent ? 'Ok' : 'Cancelar'}</button>
                    </div>
                </div>
            </div>
        </>
    )
}