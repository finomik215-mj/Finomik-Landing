import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useI18n } from './i18n';

export default function Privacy() {
  const { lang } = useI18n();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f5fc] text-finomik-navy font-sans overflow-x-hidden">
      <SeoHead
        title="Privacy Policy | Finomik"
        description="Finomik privacy policy. How we collect, use, and protect your information when you use our financial education platform."
        path="/privacy"
      />
      <header className="fixed top-0 left-0 right-0 bg-white border-b-2 border-[#1C386E]/15 shadow-sm z-50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#1C386E] font-semibold hover:text-finomik-light transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {lang === 'es' ? 'Volver a inicio' : 'Back to home'}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 pt-20 pb-12 md:pt-24 md:pb-16 max-w-5xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-[#1C386E]/30 bg-[#1C386E]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1C386E]">
            {lang === 'es' ? 'Legal' : 'Legal'}
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-[#1C386E] tracking-tight">
            {lang === 'es' ? 'Política de privacidad' : 'Privacy Policy'}
          </h1>
          <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-2xl">
            {lang === 'es'
              ? 'Cómo recopila, utiliza y protege Finomik la información cuando los centros, instituciones y personas aprendientes utilizan nuestra plataforma de educación financiera.'
              : 'How Finomik collects, uses, and protects information when educational institutions and learners use our financial education platform.'}
          </p>
          <p className="mt-4 text-sm text-[#1C386E]/70">
            {lang === 'es' ? 'Última actualización: ' : 'Last updated: '}{' '}
            {new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] md:gap-10">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section
              id="privacy-introduction"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">1</span>
                {lang === 'es' ? 'Introducción' : 'Introduction'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Finomik («nosotros» o «nuestro») se compromete a proteger tu privacidad. Esta Política de privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos tu información cuando utilizas nuestro sitio web y nuestros servicios de educación financiera. Lee este documento con atención para entender cómo tratamos tus datos.'
                  : 'Finomik ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and financial education services. Please read this policy carefully to understand how we handle your data.'}
              </p>
            </section>

            <section
              id="privacy-information-we-collect"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">2</span>
                {lang === 'es' ? 'Información que recopilamos' : 'Information we collect'}
              </h2>
              <p className="mb-3">
                {lang === 'es'
                  ? 'Podemos recopilar información que nos facilitas directamente, entre otras:'
                  : 'We may collect information that you provide directly to us, including:'}
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2 marker:text-[#1C386E]/60">
                <li>
                  {lang === 'es'
                    ? 'Nombre y datos de contacto (por ejemplo, dirección de correo electrónico) cuando solicitas información o te pones en contacto con nosotros.'
                    : 'Name and contact details (e.g. email address) when you request information or get in touch'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Información de cuenta y perfil si te registras en nuestros servicios.'
                    : 'Account and profile information if you register for our services'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Comunicaciones y comentarios que nos envías.'
                    : 'Communications and feedback you send to us'}
                </li>
              </ul>
              <p className="mt-3">
                {lang === 'es'
                  ? 'También podemos recopilar automáticamente cierta información técnica cuando visitas nuestro sitio web, como la dirección IP, el tipo de navegador, información del dispositivo y datos de uso. Utilizamos esta información para operar, proteger y mejorar nuestros servicios.'
                  : 'We may also automatically collect certain technical information when you visit our website, such as IP address, browser type, device information, and usage data. We use this information to operate, secure, and improve our services.'}
              </p>
            </section>

            <section
              id="privacy-how-we-use-information"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">3</span>
                {lang === 'es' ? 'Cómo utilizamos tu información' : 'How we use your information'}
              </h2>
              <p className="mb-3">
                {lang === 'es'
                  ? 'Utilizamos la información que recopilamos para finalidades como:'
                  : 'We use the information we collect for purposes such as:'}
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2 marker:text-[#1C386E]/60">
                <li>
                  {lang === 'es'
                    ? 'Prestar, mantener y mejorar nuestros servicios de educación financiera.'
                    : 'Providing, maintaining, and improving our financial education services'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Responder a tus consultas y ofrecer soporte.'
                    : 'Responding to your enquiries and providing customer support'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Enviar comunicaciones y actualizaciones relevantes, cuando hayas aceptado recibirlas.'
                    : 'Sending relevant updates and communications, where you have agreed to receive them'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Analizar el uso y las tendencias para comprender mejor cómo se utilizan nuestros servicios.'
                    : 'Analysing usage and trends to better understand how our services are used'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Proteger la seguridad, integridad y utilización legítima de nuestros servicios.'
                    : 'Protecting the security, integrity, and lawful use of our services'}
                </li>
              </ul>
            </section>

            <section
              id="privacy-sharing-and-disclosure"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">4</span>
                {lang === 'es' ? 'Comunicación y divulgación' : 'Sharing and disclosure'}
              </h2>
              <p className="mb-3">
                {lang === 'es' ? 'No ' : 'We do '}
                <span className="font-semibold">{lang === 'es' ? 'vendemos' : 'not'}</span>
                {lang === 'es'
                  ? ' tus datos personales.'
                  : ' sell your personal information.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Podemos compartir tu información con proveedores de servicios de confianza que nos ayudan a operar nuestro sitio web y servicios, sujetos a obligaciones adecuadas de confidencialidad y protección de datos. También podemos divulgar información cuando la ley lo exija, en respuesta a procesos legales o para proteger nuestros derechos, seguridad o los de otras personas.'
                  : 'We may share your information with trusted service providers that assist us in operating our website and services, subject to appropriate confidentiality and data protection obligations. We may also disclose information where required by law, in response to legal processes, or to protect our rights, safety, or the rights and safety of others.'}
              </p>
            </section>

            <section
              id="privacy-data-retention-security"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">5</span>
                {lang === 'es' ? 'Conservación y seguridad de los datos' : 'Data retention and security'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Conservamos tu información solo durante el tiempo necesario para cumplir las finalidades descritas en esta política o mientras la ley lo requiera. Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos personales frente al acceso no autorizado, la alteración, la divulgación o la pérdida. Aunque tomamos medidas razonables para salvaguardar tus datos, ningún sistema puede ser completamente seguro.'
                  : 'We retain your information only for as long as necessary to fulfil the purposes described in this policy or as required by law. We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or loss. While we take reasonable steps to safeguard your data, no system can be completely secure.'}
              </p>
            </section>

            <section
              id="privacy-your-rights"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">6</span>
                {lang === 'es' ? 'Tus derechos' : 'Your rights'}
              </h2>
              <p className="mb-3">
                {lang === 'es'
                  ? 'Según tu ubicación y la legislación aplicable, puedes tener derecho a:'
                  : 'Depending on your location and applicable law, you may have the right to:'}
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2 marker:text-[#1C386E]/60">
                <li>
                  {lang === 'es'
                    ? 'Acceder y obtener una copia de tus datos personales.'
                    : 'Access and receive a copy of your personal data'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Rectificar datos inexactos o incompletos.'
                    : 'Rectify inaccurate or incomplete data'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Solicitar la supresión de tus datos en determinadas circunstancias.'
                    : 'Request erasure of your data in certain circumstances'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Oponerte o limitar ciertas actividades de tratamiento.'
                    : 'Object to or restrict certain processing activities'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'La portabilidad de los datos, cuando este derecho sea aplicable.'
                    : 'Data portability, where this right applies'}
                </li>
              </ul>
              <p className="mt-3">
                {lang === 'es'
                  ? 'Para ejercer estos derechos o plantear preguntas sobre nuestras prácticas de privacidad, ponte en contacto con nosotros utilizando los datos indicados en nuestro sitio web. Es posible que debamos verificar tu identidad antes de responder a ciertas solicitudes.'
                  : 'To exercise these rights or ask questions about our privacy practices, please contact us using the details provided on our website. We may need to verify your identity before responding to certain requests.'}
              </p>
            </section>

            <section
              id="privacy-cookies"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">7</span>
                {lang === 'es' ? 'Cookies y tecnologías similares' : 'Cookies and similar technologies'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Podemos utilizar cookies y tecnologías similares para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Estas tecnologías nos ayudan a entender cómo se utiliza nuestro sitio web y a dar soporte a funcionalidades esenciales. Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador, donde suele ser posible bloquear o eliminar cookies.'
                  : 'We may use cookies and similar technologies to enhance your experience, analyse traffic, and personalise content. These technologies help us understand how our website is used and support core functionality. You can manage your cookie preferences through your browser settings, which may allow you to block or delete cookies.'}
              </p>
            </section>

            <section
              id="privacy-changes"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">8</span>
                {lang === 'es' ? 'Cambios en esta política' : 'Changes to this policy'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Podemos actualizar esta Política de privacidad ocasionalmente para reflejar cambios en nuestras prácticas, tecnologías o requisitos legales. Cuando realicemos cambios importantes, actualizaremos la fecha de «Última actualización» al inicio de esta página y, cuando proceda, proporcionaremos un aviso adicional. Te recomendamos revisar esta política periódicamente.'
                  : 'We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. When we make material changes, we will update the "Last updated" date at the top of this page and, where appropriate, provide additional notice. We encourage you to review this policy periodically.'}
              </p>
            </section>

            <section
              id="privacy-contact"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">9</span>
                {lang === 'es' ? 'Contacto' : 'Contact us'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Si tienes alguna pregunta sobre esta Política de privacidad o sobre cómo tratamos los datos, ponte en contacto con nosotros a través del formulario de contacto de nuestro sitio web o utilizando los datos que allí se facilitan. Intentamos responder a las consultas relacionadas con privacidad en un plazo razonable.'
                  : 'If you have any questions about this Privacy Policy or our data practices, please contact us via the contact form on our website or at the contact details provided there. We aim to respond to privacy-related queries within a reasonable timeframe.'}
              </p>
            </section>
          </div>

          <aside className="hidden md:block">
            <nav className="sticky top-28 rounded-xl border border-[#1C386E]/15 bg-[#1C386E]/5 px-5 py-5 text-sm shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[#1C386E] mb-3">
                {lang === 'es' ? 'En esta página' : 'On this page'}
              </h2>
              <ol className="space-y-2 text-gray-700">
                <li>
                  <a href="#privacy-introduction" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '1. Introducción' : '1. Introduction'}
                  </a>
                </li>
                <li>
                  <a href="#privacy-information-we-collect" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '2. Información que recopilamos' : '2. Information we collect'}
                  </a>
                </li>
                <li>
                  <a href="#privacy-how-we-use-information" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '3. Cómo utilizamos tu información' : '3. How we use your information'}
                  </a>
                </li>
                <li>
                  <a href="#privacy-sharing-and-disclosure" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '4. Comunicación y divulgación' : '4. Sharing and disclosure'}
                  </a>
                </li>
                <li>
                  <a href="#privacy-data-retention-security" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '5. Conservación y seguridad de los datos' : '5. Data retention and security'}
                  </a>
                </li>
                <li>
                  <a href="#privacy-your-rights" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '6. Tus derechos' : '6. Your rights'}
                  </a>
                </li>
                <li>
                  <a href="#privacy-cookies" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '7. Cookies y tecnologías similares' : '7. Cookies and similar technologies'}
                  </a>
                </li>
                <li>
                  <a href="#privacy-changes" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '8. Cambios en esta política' : '8. Changes to this policy'}
                  </a>
                </li>
                <li>
                  <a href="#privacy-contact" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '9. Contacto' : '9. Contact us'}
                  </a>
                </li>
              </ol>
            </nav>
          </aside>
        </div>
      </main>
    </div>
  );
}
