import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <main className="w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          <p className="text-muted-foreground">Dark theme enforced. Shadcn/ui configured.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Edit <code className="bg-muted px-1.5 py-0.5 rounded text-sm">src/app/page.tsx</code> to start building your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row">
            <Input placeholder="Enter your email" className="max-w-xs" />
            <Button>Subscribe</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
