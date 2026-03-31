import { useState } from "react";
import { IdCard, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ studentId?: string; password?: string; general?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!studentId.trim()) newErrors.studentId = "Student ID is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      await login(studentId, password);
    } catch (err: any) {
      setErrors({ general: err.message || "Invalid TSU credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-navy flex items-center justify-center p-4 relative">
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
          <img
            src="/tsu-logo.png"
            alt="TSU"
            style={{ height: "80px", width: "auto" }}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-primary-foreground">TSU Student Portal</h1>
          <p className="text-primary-foreground/60 mt-1">Tbilisi State University — Student Self-Service</p>
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-accent text-accent-foreground hover:bg-gold-light font-semibold text-base"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
            </Button>

            <p className="text-center">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Forgot password?
              </a>
            </p>
          </form>
        </div>

        <p className="text-center text-primary-foreground/40 text-xs mt-6">
          © 2026 Tbilisi State University. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
