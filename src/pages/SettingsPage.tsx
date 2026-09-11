import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-green-300">Settings</p>
        <h1 className="mt-2 text-3xl font-black text-white">Account preferences</h1>
      </div>

      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Display name</label>
            <Input value="Ava Thompson" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Time zone</label>
            <Input value="UTC-5" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email notifications</label>
            <Input value="Enabled" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Weekly goal</label>
            <Input value="4 workouts" />
          </div>
        </div>
        <div className="mt-6">
          <Button>Save changes</Button>
        </div>
      </Card>
    </div>
  );
}
