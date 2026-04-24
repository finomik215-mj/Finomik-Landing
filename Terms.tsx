import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useI18n } from './i18n';

export default function Terms() {
  const { lang } = useI18n();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f5fc] text-finomik-navy font-sans overflow-x-hidden">
      <SeoHead
        title="Terms of Use | Finomik"
        description="Terms of use for Finomik's financial education platform and services."
        path="/terms"
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
            {lang === 'es' ? 'Términos de uso' : 'Terms of Use'}
          </h1>
          <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-2xl">
            {lang === 'es'
              ? 'Las normas para utilizar la plataforma y los servicios de educación financiera de Finomik, dirigidas a centros, instituciones y personas aprendientes.'
              : "The rules for using Finomik's financial education platform and services, written for educational institutions and learners."}
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
              id="terms-acceptance"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">1</span>
                {lang === 'es' ? 'Aceptación de los términos' : 'Acceptance of terms'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Al acceder o utilizar el sitio web de Finomik y cualquier servicio relacionado («Servicios»), aceptas quedar vinculado por estos Términos de uso. Si no estás de acuerdo con estos términos, no utilices nuestros Servicios.'
                  : 'By accessing or using the Finomik website and any related services ("Services"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Services.'}
              </p>
              <p className="mt-3">
                {lang === 'es'
                  ? 'Podemos actualizar estos términos periódicamente. Cuando lo hagamos, revisaremos la fecha de «Última actualización» anterior. El uso continuado de los Servicios tras la entrada en vigor de los cambios constituye la aceptación de los términos actualizados.'
                  : 'We may update these terms from time to time. When we do, we will revise the "Last updated" date above. Continued use of the Services after changes take effect constitutes acceptance of the updated terms.'}
              </p>
            </section>

            <section
              id="terms-description"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">2</span>
                {lang === 'es' ? 'Descripción de los servicios' : 'Description of services'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Finomik ofrece soluciones tecnológicas para la educación financiera de forma gamificada e interactiva. Nuestros Servicios tienen una finalidad educativa y están diseñados para ayudar a desarrollar alfabetización financiera y habilidades prácticas de gestión del dinero.'
                  : 'Finomik provides technological solutions for financial education in a gamified and interactive way. Our Services are intended for educational purposes to help users develop financial literacy and practical money-management skills.'}
              </p>
              <p className="mt-3">
                {lang === 'es'
                  ? 'El contenido y las herramientas que proporcionamos no constituyen asesoramiento financiero, de inversión, jurídico ni fiscal, y no deben tomarse como tal. Las personas usuarias deben buscar asesoramiento profesional independiente cuando corresponda.'
                  : 'The content and tools we provide do not constitute financial, investment, legal, or tax advice, and should not be relied upon as such. Users should seek independent professional advice where appropriate.'}
              </p>
            </section>

            <section
              id="terms-permitted-use"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">3</span>
                {lang === 'es' ? 'Uso permitido' : 'Permitted use'}
              </h2>
              <p className="mb-3">
                {lang === 'es'
                  ? 'Solo puedes utilizar nuestros Servicios con fines lícitos y de acuerdo con estos Términos. Te comprometes a no:'
                  : 'You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to:'}
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2 marker:text-[#1C386E]/60">
                <li>
                  {lang === 'es'
                    ? 'Utilizar los Servicios de manera que infrinja las leyes o normativas aplicables.'
                    : 'Use the Services in any way that violates applicable laws or regulations'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Intentar obtener acceso no autorizado a nuestros sistemas, cuentas o redes.'
                    : 'Attempt to gain unauthorised access to our systems, accounts, or networks'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Copiar, modificar, distribuir o crear obras derivadas de nuestro contenido sin permiso.'
                    : 'Copy, modify, distribute, or create derivative works from our content without permission'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Utilizar los Servicios para transmitir código malicioso, spam o información engañosa.'
                    : 'Use the Services to transmit harmful code, spam, or misleading information'}
                </li>
                <li>
                  {lang === 'es'
                    ? 'Interferir con la integridad o el rendimiento de los Servicios o alterarlos.'
                    : 'Interfere with or disrupt the integrity or performance of the Services'}
                </li>
              </ul>
            </section>

            <section
              id="terms-intellectual-property"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">4</span>
                {lang === 'es' ? 'Propiedad intelectual' : 'Intellectual property'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Todo el contenido, materiales, software y demás elementos protegidos por derechos de propiedad intelectual de los Servicios de Finomik pertenecen a Finomik o a sus licenciantes. No puedes utilizar, reproducir ni distribuir dicho contenido sin nuestro consentimiento previo por escrito, salvo para uso personal y no comercial en la forma permitida por la funcionalidad de los Servicios.'
                  : 'All content, materials, software, and other intellectual property on or underlying the Finomik Services are owned by Finomik or its licensors. You may not use, reproduce, or distribute any such content without our prior written consent, except for personal, non-commercial use as permitted by the functionality of the Services.'}
              </p>
            </section>

            <section
              id="terms-limitation-of-liability"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">5</span>
                {lang === 'es' ? 'Limitación de responsabilidad' : 'Limitation of liability'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'En la medida máxima permitida por la ley, Finomik y sus entidades vinculadas no serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de la pérdida de beneficios, datos o fondo de comercio derivados del uso o la imposibilidad de uso de los Servicios.'
                  : 'To the fullest extent permitted by law, Finomik and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill, arising from your use of or inability to use the Services.'}
              </p>
              <p className="mt-3">
                {lang === 'es'
                  ? 'Nuestra responsabilidad total por cualquier reclamación derivada de estos Términos o de los Servicios no superará el importe que nos hayas abonado, en su caso, durante los doce meses anteriores a la reclamación. Algunas jurisdicciones no permiten ciertas limitaciones de responsabilidad; en esos casos, nuestra responsabilidad se limitará en la medida máxima permitida por la ley aplicable.'
                  : 'Our total liability for any claims arising from these Terms or the Services shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim. Some jurisdictions do not allow certain limitations of liability; in such cases, our liability will be limited to the maximum extent permitted by law.'}
              </p>
            </section>

            <section
              id="terms-disclaimer"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">6</span>
                {lang === 'es' ? 'Exclusión de garantías' : 'Disclaimer of warranties'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Los Servicios se prestan «tal cual» y «según disponibilidad», sin garantías de ningún tipo, expresas o implícitas. No garantizamos que los Servicios estén libres de interrupciones, errores o componentes dañinos.'
                  : 'The Services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Services will be uninterrupted, error-free, or free of harmful components.'}
              </p>
              <p className="mt-3">
                {lang === 'es'
                  ? 'Los resultados educativos pueden variar. No garantizamos un resultado concreto derivado del uso de nuestros materiales de educación financiera.'
                  : 'Educational outcomes may vary. We do not guarantee any particular result from use of our financial education materials.'}
              </p>
            </section>

            <section
              id="terms-privacy"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">7</span>
                {lang === 'es' ? 'Privacidad' : 'Privacy'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'El uso que haces de los Servicios también se rige por nuestra Política de privacidad, que describe cómo recopilamos, utilizamos y protegemos tus datos personales. Al utilizar los Servicios, aceptas las prácticas descritas en dicha Política de privacidad.'
                  : 'Your use of the Services is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information. By using the Services, you consent to the practices described in our Privacy Policy.'}
              </p>
            </section>

            <section
              id="terms-termination"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">8</span>
                {lang === 'es' ? 'Resolución' : 'Termination'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Podemos suspender o finalizar tu acceso a los Servicios en cualquier momento, con o sin causa o preaviso. Tras la resolución, tu derecho a utilizar los Servicios cesa de inmediato.'
                  : 'We may suspend or terminate your access to the Services at any time, with or without cause or notice. Upon termination, your right to use the Services ceases immediately.'}
              </p>
              <p className="mt-3">
                {lang === 'es'
                  ? 'Las disposiciones de estos Términos que, por su naturaleza, deban seguir vigentes tras la resolución (incluidas las limitaciones de responsabilidad, las exenciones de garantía y la protección de la propiedad intelectual) continuarán en efecto después de la misma.'
                  : 'Provisions of these Terms that by their nature should survive termination (including limitations of liability, disclaimers, and intellectual property protections) shall continue in effect after termination.'}
              </p>
            </section>

            <section
              id="terms-governing-law"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">9</span>
                {lang === 'es' ? 'Legislación aplicable' : 'Governing law'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Estos Términos se regirán e interpretarán de acuerdo con las leyes de la jurisdicción en la que opere Finomik, sin perjuicio de sus normas sobre conflicto de leyes. Cualquier disputa derivada de estos Términos o de los Servicios se someterá a la jurisdicción exclusiva de los tribunales de dicha jurisdicción, salvo que la legislación aplicable disponga otra cosa.'
                  : 'These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Finomik operates, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Services shall be subject to the exclusive jurisdiction of the courts in that jurisdiction, unless otherwise required by applicable law.'}
              </p>
            </section>

            <section
              id="terms-contact"
              className="rounded-xl border-l-4 border-[#1C386E] border border-[#1C386E]/10 bg-white px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1C386E] mb-3 flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C386E]/10 text-sm font-bold text-[#1C386E]">10</span>
                {lang === 'es' ? 'Contacto' : 'Contact'}
              </h2>
              <p>
                {lang === 'es'
                  ? 'Si tienes preguntas sobre estos Términos de uso, ponte en contacto con nosotros a través del formulario de contacto u otros datos facilitados en nuestro sitio web. Intentamos responder a las consultas razonables en un plazo adecuado.'
                  : 'For questions about these Terms of Use, please contact us via the contact form or other contact details provided on our website. We aim to respond to reasonable enquiries within a reasonable timeframe.'}
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
                  <a href="#terms-acceptance" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '1. Aceptación de los términos' : '1. Acceptance of terms'}
                  </a>
                </li>
                <li>
                  <a href="#terms-description" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '2. Descripción de los servicios' : '2. Description of services'}
                  </a>
                </li>
                <li>
                  <a href="#terms-permitted-use" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '3. Uso permitido' : '3. Permitted use'}
                  </a>
                </li>
                <li>
                  <a href="#terms-intellectual-property" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '4. Propiedad intelectual' : '4. Intellectual property'}
                  </a>
                </li>
                <li>
                  <a href="#terms-limitation-of-liability" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '5. Limitación de responsabilidad' : '5. Limitation of liability'}
                  </a>
                </li>
                <li>
                  <a href="#terms-disclaimer" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '6. Exclusión de garantías' : '6. Disclaimer of warranties'}
                  </a>
                </li>
                <li>
                  <a href="#terms-privacy" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '7. Privacidad' : '7. Privacy'}
                  </a>
                </li>
                <li>
                  <a href="#terms-termination" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '8. Resolución' : '8. Termination'}
                  </a>
                </li>
                <li>
                  <a href="#terms-governing-law" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '9. Legislación aplicable' : '9. Governing law'}
                  </a>
                </li>
                <li>
                  <a href="#terms-contact" className="hover:text-[#1C386E] transition-colors block py-0.5">
                    {lang === 'es' ? '10. Contacto' : '10. Contact'}
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
