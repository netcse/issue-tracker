"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {

  const [value, setValue] = useState("");

  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE value={value} onChange={setValue} placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
