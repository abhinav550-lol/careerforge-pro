import puppeteer from 'puppeteer';

export const generatePdf = async (req, res) => {
  const { resume_id } = req.params;

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      // DIRECTORY FOR WINDOWS CHROME (Typical path)
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // networkidle0 is crucial for loading your AI-generated summaries
    const targetUrl = `${process.env.FRONTEND_URL}/dashboard/view-resume/${resume_id}`;
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Resume-${resume_id}.pdf"`,
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ message: "Failed to generate PDF. Check if Chrome path is correct.", error: error.message });
  }
};