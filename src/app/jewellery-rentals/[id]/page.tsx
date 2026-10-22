import React from 'react';
import { notFound } from 'next/navigation';
import { JEWELLERY_PRODUCTS } from '@/data/siteData';
import JewelleryProductClient from '@/components/JewelleryProductClient';

export function generateStaticParams() {
  return JEWELLERY_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function JewelleryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = JEWELLERY_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <JewelleryProductClient product={product} />;
}
