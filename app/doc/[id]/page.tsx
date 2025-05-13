'use client'
import React from "react";
import Document from "@/components/Document";

const DocumentPage = (rawParams: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(rawParams.params);

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
};

export default DocumentPage;
