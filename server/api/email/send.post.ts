export default defineEventHandler(async (event) => {
  const { sendMail } = useNodeMailer();
  const body = await readBody(event);
  const { subject, text, to } = body;

  return sendMail({
    subject,
    text,
    to,
  });
});
