import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';

export function ContactPage() {
  return (
    <div className="container-shell py-16">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-green-300">Contact</p>
        <h1 className="text-4xl font-black text-white sm:text-5xl">We’re here to help.</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card className="p-6">
          <div className="space-y-5">
            <div className="flex items-center gap-3"><Mail className="text-green-300" size={18} /> <span className="text-slate-300">hello@plfit.net</span></div>
            <div className="flex items-center gap-3"><Phone className="text-green-300" size={18} /> <span className="text-slate-300">+1 (800) 123-4567</span></div>
            <div className="flex items-center gap-3"><MapPin className="text-green-300" size={18} /> <span className="text-slate-300">Austin, Texas</span></div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">First Name</label>
              <Input placeholder="Your first name" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Last Name</label>
              <Input placeholder="Your last name" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-300">Message</label>
              <textarea className="input-field min-h-32 resize-none" placeholder="Tell us how we can help." />
            </div>
          </div>
          <div className="mt-5">
            <Button>Send Message</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
