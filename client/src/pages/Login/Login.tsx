import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting login...');
      await login(email, password, rememberMe);
      console.log('Login successful, redirecting to dashboard...');
      
      toast({
        title: t('auth.login_success'),
        description: t('auth.welcome_back'),
      });
      
      // Force redirect to dashboard using window.location
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: t('auth.login_failed'),
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">{t('auth.login_title')}</h1>
          <p className="text-muted-foreground mt-2">{t('auth.login_subtitle')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-card border rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@nuklias.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal cursor-pointer"
              >
                {t('auth.remember_me')}
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t('auth.signing_in') : t('auth.sign_in')}
            </Button>
          </form>

          {/* Test Credentials */}
          <div className="mt-6 p-4 bg-muted rounded-md text-sm">
            <p className="font-semibold mb-2">{t('auth.test_credentials')}:</p>
            <p className="text-muted-foreground">
              <strong>Admin:</strong> admin@nuklias.com / Admin123!
            </p>
            <p className="text-muted-foreground">
              <strong>Member:</strong> member@nuklias.com / Member123!
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <button
            onClick={() => setLocation('/')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← {t('auth.back_home')}
          </button>
        </div>
      </div>
    </div>
  );
}
