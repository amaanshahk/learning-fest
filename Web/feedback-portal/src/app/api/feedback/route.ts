import { NextRequest, NextResponse } from "next/server";

type Feedback = {
  id: string;
  name: string;
  message: string;
  rating: number;
  createdAt: string;
};

const initialFeedback: Feedback[] = [
  {
    id: "sample-feedback",
    name: "amaanshahk@mulearn",
    message: "Excited to be part of Learning Fest! Looking forward to building and learning.",
    rating: 5,
    createdAt: new Date().toISOString(),
  },
];

const store = globalThis as typeof globalThis & {
  feedbackStore?: Feedback[];
};

if (!store.feedbackStore) {
  store.feedbackStore = initialFeedback;
}

function validate(body: Partial<Feedback>) {
  if (!body.name?.trim()) return "Name is required.";
  if (body.name.trim().length > 50) return "Name must be 50 characters or fewer.";
  if (!body.message?.trim()) return "Message is required.";
  if (body.message.trim().length > 500) return "Message must be 500 characters or fewer.";
  if (!Number.isInteger(body.rating) || body.rating! < 1 || body.rating! > 5) {
    return "Rating must be between 1 and 5.";
  }
  return null;
}

export async function GET() {
  return NextResponse.json(store.feedbackStore ?? []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const error = validate(body);

  if (error) return NextResponse.json({ error }, { status: 400 });

  const feedback: Feedback = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    message: body.message.trim(),
    rating: body.rating,
    createdAt: new Date().toISOString(),
  };

  store.feedbackStore!.unshift(feedback);
  return NextResponse.json(feedback, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const error = validate(body);

  if (error) return NextResponse.json({ error }, { status: 400 });

  const index = store.feedbackStore!.findIndex((item) => item.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Feedback not found." }, { status: 404 });
  }

  store.feedbackStore![index] = {
    ...store.feedbackStore![index],
    name: body.name.trim(),
    message: body.message.trim(),
    rating: body.rating,
  };

  return NextResponse.json(store.feedbackStore![index]);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const before = store.feedbackStore!.length;

  store.feedbackStore = store.feedbackStore!.filter((item) => item.id !== id);

  if (store.feedbackStore.length === before) {
    return NextResponse.json({ error: "Feedback not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
