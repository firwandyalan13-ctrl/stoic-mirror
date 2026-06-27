# 斯多葛实践镜

匿名斯多葛实践自评 Web 应用。照出受测者此刻在五个维度的练习程度，并聚合匿名群体数据作参照。

## 本地开发

```bash
npm install
cp .env.example .env   # 填入 Supabase 凭据（可选，无则跳过持久化）
npm run dev
```

## Supabase 设置

1. 在 [supabase.com](https://supabase.com) 创建新项目
2. 打开 **SQL Editor**，粘贴并执行 `supabase/schema.sql`
3. 在 **Project Settings → API** 复制：
   - Project URL → `VITE_SUPABASE_URL`
   - anon public key → `VITE_SUPABASE_ANON_KEY`
4. 写入本地 `.env` 与 Vercel 环境变量

## 部署到 Vercel

```bash
vercel login          # 首次需要
vercel link           # 关联项目
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel --prod
```

或通过 [vercel.com](https://vercel.com) 导入 GitHub 仓库，添加相同环境变量后部署。

## 技术栈

React · Vite · TypeScript · Tailwind CSS · Supabase · Vercel
