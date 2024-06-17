import React from 'react';
import Head from 'next/head';
import Header from '../components/header/main';
import Footer from '../components/footer/main';

const DmcaPage = () => {
  return (
    <>
      <Head>
        <title>DMCA - filmovyraj.com</title>
        <meta name="description" content="DMCA oznámení pro filmovyraj.com. Provozovatel nenese odpovědnost za porušování autorských práv, jelikož žádný obsah není uložen na našich serverech." />
        <meta name="keywords" content="DMCA, filmovyraj.com, autorská práva, embedovaná videa, legální obsah" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://filmovyraj.com/dmca" />
      </Head>
      <Header/>
      <div className="text-white p-10 mt-[70px]">
        <h1 className="text-3xl font-bold mb-5">DMCA</h1>
        <p className="mb-5">
          Provozovatel tohoto portálu nenese odpovědnost za porušování autorských práv! Důvodem je, že žádná videa nejsou uložena na našich serverech. Veškerý obsah je embedován z jiných stránek, což znamená, že nemáme možnost ověřit dodržování autorských práv na těchto zdrojích. Provozovatel není majitelem žádného z těchto externích webů.
        </p>
        <p className="mb-5">
          Hlavním účelem portálu filmovyraj.com je poskytovat odkazy na tzv. embedovaná videa.
        </p>
        <p className="mb-5">
          Tato činnost byla Evropským soudem prohlášena za legální, a proto neporušujeme žádné zákony. Zdroje:
        </p>
        <ul className="mb-5 list-disc list-inside">
          <li><a href="http://www.scribd.com/doc/244360017/EuGH-C-348-13-Framing" className="text-blue-400">scribd.com</a></li>
          <li><a href="https://edri.org/cjeu-embedding-copyright-infringement" className="text-blue-400">edri.org</a></li>
          <li><a href="https://torrentfreak.com/embedding-copyright-infringement-eu-court-rules-141025/" className="text-blue-400">torrentfreak.com</a></li>
        </ul>
        <p className="mb-5">
          Autorský ochranný svaz pro Slovenskou republiku (SOZA) a Českou republiku (OSA) také uznávají, že využívání embedovacích kódů není veřejným přenosem.
        </p>
        <p className="mb-5">
          Pokud jste vlastníkem práv k nějakému souboru, uvědomte si, že odstraněním odkazu nebude odstraněno skutečné zdrojové video. Musíte kontaktovat přímo vlastníky serverů a požádat je o odstranění. Portál filmovyraj.com poskytuje pouze odkazy, nikoliv konkrétní soubory!
        </p>
      </div>
      <Footer/>
    </>
  );
};

export default DmcaPage;
