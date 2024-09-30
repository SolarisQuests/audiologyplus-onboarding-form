import { NextResponse } from 'next/server'

export async function POST(request) {
  // Handle the form submission
  return NextResponse.json({ message: 'Form submitted successfully' })
}