import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 기존 Next.js 및 TypeScript 설정 포함
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 추가 규칙 설정
  {
    files: ["**/*.ts", "**/*.tsx"], // TypeScript 파일에만 적용
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];

export default eslintConfig;
