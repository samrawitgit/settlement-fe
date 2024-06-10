"use client";

import { RecoilRoot } from "recoil";
import { Main } from "@pages/Main";

export default function Home() {
  return (
    <RecoilRoot>
      <div className="app-container">
        <Main />
      </div>
    </RecoilRoot>
  );
}
