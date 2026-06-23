import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const srcPath = '/home/z/my-project/tmp_zai/anders_source_small.jpg';
const outPath = '/home/z/my-project/public/assets/anders-portrait.png';

const buf = fs.readFileSync(srcPath);
const b64 = buf.toString('base64');
const dataUrl = `data:image/jpeg;base64,${b64}`;

const prompt = "Remove the woman on the left side of this image entirely. Keep only the man on the right (dark blue quilted jacket, blue collared shirt, short light brown hair). Fill the left area with the existing green foliage background so it looks natural. Crop to a portrait suitable for a professional website hero.";

console.log('Initializing ZAI...');
const zai = await ZAI.create();
console.log('Calling image edit (size 768x1344)...');
try {
  const resp = await zai.images.generations.edit({
    prompt,
    images: [{ url: dataUrl }],
    size: '768x1344',
  });
  const out = resp.data[0].base64;
  fs.writeFileSync(outPath, Buffer.from(out, 'base64'));
  const st = fs.statSync(outPath);
  console.log(`OK wrote ${outPath} (${st.size} bytes)`);
} catch (e) {
  console.error('EDIT_FAILED:', e.message);
  process.exit(1);
}
