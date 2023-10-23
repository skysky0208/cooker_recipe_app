import React from 'react';

interface PasswordFormProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ password, setPassword }) => {
    return (
        <div>
            <label htmlFor="password" className="block text-sm mb-2">
                パスワード
            </label>
            <div className="relative">
                <input
                    type="password"
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    name="password"
                    className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-orange-400 focus:ring-orange-400"
                    required
                    aria-describedby="password-error"
                    placeholder="6文字以上"
                />
            </div>
        </div>
    );
};

export default PasswordForm;
