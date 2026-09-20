import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';

export function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Admin settings</p>
        <h1 className="mt-2 text-3xl font-black text-white">Platform configuration</h1>
      </div>

      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Platform name</label>
            <Input value="OUAGx" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">API base URL</label>
            <Input value="https://api.ouagx.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Database provider</label>
            <Input value="PostgreSQL" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Environment</label>
            <Input value="production" />
          </div>
        </div>
        <div className="mt-6">
          <Button>Update settings</Button>
        </div>
      </Card>
    </div>
  );
}
