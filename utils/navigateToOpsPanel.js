
import { getOpsUrl } from './getBaseUrl.js';

export async function navigateToOpsPanel(context, loginOpsPage) {
  const newTab = await context.newPage();
  const opsUrl = getOpsUrl();

  console.log(`🌐 Navigating to Ops panel: ${opsUrl}`);
  await newTab.goto(opsUrl, { waitUntil: 'domcontentloaded' });
  // await newTab.waitForTimeout(3000);
  await loginOpsPage.login(newTab);
  console.log('✅ Logged into Ops panel.');

  return newTab;
}
export async function navigateToOpsProductPage(newTab, productSegment, PageClass) {
  const opsUrl = getOpsUrl();
  const opsProductPageUrl = `${opsUrl}/products/${productSegment}`;

  console.log(`🌐 Navigating to Ops product page: ${opsProductPageUrl}`);
  await newTab.goto(opsProductPageUrl, { waitUntil: 'domcontentloaded' });
  // await newTab.waitForTimeout(3000);
  const opsPanelPage = new PageClass(newTab);
  return opsPanelPage;
}