import React, { useState, useRef, useEffect } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { LeftPanelWelcome } from '../components/LeftPanelWelcome';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export interface SignInErrors {
  email?: string;
  password?: string;
}

/**
 * Design 2.2 Sign In, 2.4 Error State.
 */
export function SignInScreen() {
  const { setAuthPhase, setError, error, setError: setContextError } = useDesktop();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<SignInErrors>({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signInFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key.toLowerCase() === 'e') {
          e.preventDefault();
          emailRef.current?.focus();
        }
        if (e.key.toLowerCase() === 'p') {
          e.preventDefault();
          passwordRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const validate = (): boolean => {
    const next: SignInErrors = {};
    if (!email.trim()) {
      next.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = 'Please enter a complete email address (e.g., name@example.com)';
    }
    if (!password) {
      next.password = 'Password is required.';
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      next.password = `Password must be at least 8 characters long (currently ${password.length})`;
    }
    setErrors(next);
    setContextError(
      Object.keys(next).length > 0
        ? `Let's fix ${Object.keys(next).length} thing${Object.keys(next).length === 1 ? '' : 's'} to sign in.`
        : null
    );
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!validate()) return;
    setContextError(null);
    setAuthPhase('authenticated');
  };

  const hasErrors = Object.keys(errors).length > 0 && (touched.email || touched.password);

  return (
    <div className="layout-two-panel layout-auth">
      <LeftPanelWelcome />
      <div className="panel-main panel-auth" ref={signInFormRef}>
        <a href="#sign-in-form" className="skip-link skip-link-inline">
          Skip to sign-in form
        </a>
        <p className="keyboard-tip" role="status">
          Use Tab to navigate, Enter to activate
        </p>
        <h2 id="sign-in-heading">Sign in to your account</h2>
        <p className="panel-subtitle">Enter your credentials to access your healthcare portal.</p>

        {hasErrors && (
          <div className="error-summary" role="alert">
            <h3>Let&apos;s fix {Object.keys(errors).length} thing{Object.keys(errors).length === 1 ? '' : 's'} to sign in.</h3>
            <p>We found a couple of issues with the information you entered:</p>
            <ol>
              {errors.email && <li>Email address — {errors.email}</li>}
              {errors.password && <li>Password — {errors.password}</li>}
            </ol>
            <p>Please review the highlighted fields below.</p>
          </div>
        )}

        <form
          id="sign-in-form"
          onSubmit={handleSubmit}
          noValidate
          className="sign-in-form"
          aria-labelledby="sign-in-heading"
        >
          <div className="form-group">
            <label htmlFor="signin-email">Email address *</label>
            <input
              ref={emailRef}
              id="signin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="your.email@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'signin-email-error' : undefined}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <p id="signin-email-error" className="form-error" role="alert">
                {errors.email}
              </p>
            )}
            <p className="form-helper">Use the email address associated with your CareConnect account</p>
          </div>
          <div className="form-group">
            <label htmlFor="signin-password">Password *</label>
            <input
              ref={passwordRef}
              id="signin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="Enter your password"
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'signin-password-error' : undefined}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && (
              <p id="signin-password-error" className="form-error" role="alert">
                {errors.password}
              </p>
            )}
            <p className="form-helper">
              <a href="#forgot" className="link">Forgot password?</a> Enter the password for your account.
            </p>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                aria-label="Remember me on this device"
              />
              Remember me on this device
            </label>
            <p className="form-helper">Stay signed in for faster access. Don&apos;t use on shared computers.</p>
          </div>
          <button type="submit" className="btn-primary">Sign in</button>
          <button type="button" className="btn-secondary">Email me a sign-in link</button>
          <p className="separator">Or use a secure alternative</p>
          <button type="button" className="btn-secondary">Sign in with Windows Hello / Passkey</button>
          <p className="form-helper">Optional: Use biometrics or a security key</p>
        </form>
      </div>
    </div>
  );
}
