import { useState } from "react";
import { Shield, IdCard, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ studentId?: string; password?: string; general?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!studentId.trim()) newErrors.studentId = "Student ID is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (studentId === "STU123456" && password === "password123") {
      setErrors({});
      onLogin();
    } else {
      setErrors({ general: "Invalid Student ID or password. Try STU123456 / password123" });
    }
  };

  return (
    <div className="min-h-screen gradient-navy flex items-center justify-center p-4 relative overflow-hidden">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/20 border-2 border-accent mb-4">
            <Shield className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">Student Portal</h1>
          <p className="text-primary-foreground/60 mt-1">Sign in to access your academic dashboard</p>
        </div>

        <div className="bg-card rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.general && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Student ID</label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="e.g. STU123456"
                  value={studentId}
                  onChange={(e) => { setStudentId(e.target.value); setErrors({}); }}
                  className={`pl-10 h-11 ${errors.studentId ? "border-destructive" : ""}`}
                />
              </div>
              {errors.studentId && <p className="text-xs text-destructive">{errors.studentId}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
                  className={`pl-10 pr-10 h-11 ${errors.password ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full h-11 bg-accent text-accent-foreground hover:bg-gold-light font-semibold text-base">
              Sign In
            </Button>

            <p className="text-center">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Forgot password?
              </a>
            </p>
          </form>
        </div>

        <p className="text-center text-primary-foreground/40 text-xs mt-6">
          © 2026 University Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
