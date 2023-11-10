import React from 'react';

interface EmailFormProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailForm: React.FC<EmailFormProps> = ({ email, setEmail }) => {
    return (
        <div>
            <label htmlFor="email" className="block text-sm mb-2">
                メールアドレス
            </label>
            <div className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    id="email"
                    name="email"
                    className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-orange-400 focus:ring-orange-400"
                    required
                    aria-describedby="email-error"
                    placeholder="sample@sample.com"
                />
            </div>
        </div>
    );
};

export default EmailForm;
