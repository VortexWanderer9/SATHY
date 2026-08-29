import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Input from "@/components/ui/Input";

export default function HomePage() {
  return (
    <Container className="py-16">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to SATHY</h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          A simple social platform for discovering friends, communities, and
          activities based on shared interests and location. Below is a live
          demo of the Part 1 UI Kit.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Buttons</h2>
        <Card>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Badges</h2>
        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="purple">Purple</Badge>
            <Badge variant="pink">Pink</Badge>
          </div>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Avatars</h2>
        <Card>
          <div className="flex flex-wrap items-end gap-4">
            <Avatar name="Alex Rivera" size="sm" />
            <Avatar name="Priya Sharma" size="md" />
            <Avatar name="Marcus Johnson" size="lg" />
            <Avatar name="Yuki Tanaka" size="xl" />
            <Avatar src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20friendly%20young%20adult%20person%20smiling&image_size=square" name="Jamie Lee" size="lg" />
          </div>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Inputs</h2>
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Input label="Full name" placeholder="Type your name" />
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input label="Username" defaultValue="sathy_user" />
            <Input label="Disabled input" disabled placeholder="Not editable" />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Combined Card Demo
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="flex items-start gap-4">
              <Avatar name="Sam Chen" size="lg" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Sam Chen</h3>
                  <Badge variant="success">Online</Badge>
                  <Badge variant="info">Member</Badge>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Loves hiking, photography, and coffee meetups. Based in
                  Seattle.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="purple">Hiking</Badge>
                  <Badge variant="pink">Photography</Badge>
                  <Badge variant="default">Coffee</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="primary">Follow</Button>
                  <Button size="sm" variant="outline">Message</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <Avatar name="Jordan Patel" size="lg" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Jordan Patel</h3>
                  <Badge variant="warning">Away</Badge>
                  <Badge variant="primary">Pro</Badge>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Board game organizer, amateur chef, and open source
                  contributor.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="info">Board Games</Badge>
                  <Badge variant="success">Cooking</Badge>
                  <Badge variant="purple">OSS</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="primary">Follow</Button>
                  <Button size="sm" variant="outline">Message</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Container>
  );
}
