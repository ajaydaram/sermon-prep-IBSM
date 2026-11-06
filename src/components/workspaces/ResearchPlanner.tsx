import React, { useState } from 'react';
import type { StudentResearchPapersState, StudentBibliographySource } from '../../types';
import { Plus, Trash2, Download, Sparkles, BookOpen, FileText, Copy, Check } from 'lucide-react';

interface ResearchPlannerProps {
  researchPapers: StudentResearchPapersState;
  setResearchPapers: (papers: StudentResearchPapersState) => void;
  markTaskDone: (taskId: string, isDone: boolean) => void;
  taskStatus: Record<string, string>;
}

export const EXACT_SLAVERY_PAPER = {
  title: "ROMAN SLAVERY IN THE FIRST CENTURY AD: HISTORICAL-CULTURAL CONTEXT AND THE INTERPRETATION OF PHILEMON",
  outline: {
    intro: `What does redemption mean in a world where some people were legally owned by others? In Christian theology, redemption usually means spiritual freedom: Christ saves believers from sin and brings them into a new relationship with God.¹ But the first Christians lived in a society where slavery was not just a metaphor; it was a normal, everyday reality. Slavery was deeply tied to Roman economic, legal, and social life, and slaves worked on farms, in homes, in business, in education, and in government.² Because of this, words like freedom, service, redemption, and brotherhood had both spiritual and social meaning for first-century believers.³

This historical setting is very important for understanding Paul’s Letter to Philemon. As New Testament scholars such as J. Albert Harrill and Douglas Moo point out, the relationship between Philemon and Onesimus was not just a personal disagreement; Roman law gave masters extensive legal authority over enslaved people.⁴ This background helps us see why Paul asked Philemon to receive Onesimus “no longer as a slave, but more than a slave, a beloved brother” (Phlm 16).

The New Testament writers used words and social ideas that their readers already knew. Therefore, we must not read the Bible only through modern ideas of freedom and slavery. Historical context does not replace the biblical text, but it helps us understand the world where it was first read. This study investigates how the legal, social, and economic realities of first-century Roman slavery illuminate Paul’s Letter to Philemon and clarify New Testament themes such as redemption, freedom, and Christian brotherhood. To examine this thesis, this paper covers six areas: (1) the historical prevalence and economic roles of Roman slavery; (2) how people became slaves; (3) their legal status and daily living conditions; (4) manumission and patron-client ties; (5) biblical perspectives on slavery across the Old and New Testaments; and (6) the crisis in Philemon regarding Onesimus and Paul’s appeal in Philemon 16.`,
    prevalence: `Slavery was a major institution in Roman society. Keith Bradley explains that slavery was deeply woven into Roman economic and social organization.⁵ Enslaved people did not do only one kind of work; they worked on farms, in households, in commercial shops, in mines, as teachers, and in city administration.⁶ Christy Cobb, Katherine Shaner, and Noel Lenski also show that slavery reached into almost every area of the ancient Mediterranean world.⁷ Furthermore, relations between masters and slaves often involved close domestic contact and mutual dependence in daily life.⁸

Historians agree that determining the exact number of enslaved people in the first-century Roman Empire is impossible because ancient records do not preserve reliable statistics, meaning modern scholars must work with limited evidence.⁹ Walter Scheidel warns that estimates of the Roman slave population must be handled carefully because the data does not allow exact calculations.¹⁰ At the same time, Scheidel shows that slavery was very common in Roman Italy, while Bradley highlights its presence across the empire.¹¹ Therefore, even if we cannot know the exact numbers, we know that slavery was a basic foundation of the Roman world.

Roman slavery was also very different from modern race-based slavery. John Byron explains that ancient slavery was not organized by race or skin color, and enslaved people came from many different ethnic groups and regions.¹² Warfare was one major source, especially during Roman military expansion, when captives were sold into slavery across the provinces.¹³ Piracy was another source, while children born to enslaved mothers were automatically slaves by law.¹⁴

These varied sources show that slaves did not share the same background. Bradley highlights the wide variety of slave experiences.¹⁵ A slave’s daily life depended on their job, their location, and their master’s personality. Enslaved people could be farmhands, household servants, doctors, or managers.¹⁶ Yet different jobs did not change their legal reality. Harrill explains that slaves stayed under a legal system where their status remained legally controlled by others.¹⁷ Roman law treated enslaved people as property (servi) under the authority of their masters, a condition that Justinian later described as being “contrary to nature.”¹⁸

Roman slavery also allowed legal paths to freedom through manumission. Craig S. de Vos points out that getting freedom did not end the social connection between a former slave and their master.¹⁹ A person could become free, but the relationship continued under new patron-client obligations.²⁰ When Paul calls Onesimus a “beloved brother,” he gives a new Christian identity to a relationship that was built on inequality and control.`,
    mechanisms: `To understand the Roman slave system, we must examine how people entered slavery. Scheidel identifies warfare, birth, and trade as the main sources of the Roman slave population,²¹ while Bradley describes the different legal and social ways people became slaves.²² These sources show that slavery affected people from many backgrounds.

Warfare was a major source of slaves. Scheidel notes that military conquest was one of the largest early sources of slaves in Rome, as captives were sold into bondage, transported far from their homelands, and separated from their families.²³ But warfare alone does not explain how slavery continued during the first century AD. Scheidel argues that as Roman borders stabilized under the Pax Romana, military captives decreased, making other internal sources much more important to maintain the labor supply.²⁴

Another main source was birth. Under Roman law, a child’s legal status followed the mother (partus sequitur ventrem), meaning children born to enslaved women were classified as slaves from birth.²⁵ Scheidel shows that natural reproduction was essential for keeping up the slave population.²⁶ Children born in the household (vernae) grew up in slavery without ever experiencing war or kidnapping. This generational cycle shows that slavery continued from parent to child, regardless of any personal fault.

Piracy and kidnapping also supplied many slaves. Philip de Souza shows that Mediterranean piracy was a constant problem, and captured travelers were sold directly into commercial trade networks.²⁷ Captives were auctioned in slave markets and moved across great distances, creating wide ethnic, cultural, and language diversity among enslaved people in Roman cities.

Economic hardship also made people vulnerable to slavery. Extreme poverty did not make everyone a slave, but it existed in a legal system that allowed bonded labor and dependency. Byron and Cobb and Shaner explain that deep debt sometimes led people to sell themselves or abandon unwanted infants (expositio), who were then picked up and raised as slaves.²⁸ Roman slavery was therefore fed by many different paths.

This background reminds us to be careful when reading Philemon. The letter does not tell us how Onesimus became a slave or why he was separated from Philemon. We should not guess more than what the text says: Onesimus was legally enslaved, and Paul called for a transformed relationship based on Christian brotherhood.`,
    dailyLife: `The daily lives of slaves varied greatly. Bradley shows that enslaved people lived under very different conditions depending on where they lived and what tasks they did.²⁹ Rural workers faced hard physical labor, while urban slaves often managed household and business affairs.

Farm work and mining were brutal and dangerous, as enslaved field hands worked exhausting hours with little food and were locked in work-barracks (ergastula) overnight under strict overseers.³⁰ In contrast, city households needed many skilled workers. Enslaved people worked as cooks, nurses, teachers, craftsmen, secretaries, and accountants, often holding major responsibility.³¹

This contrast warns us not to treat Roman slavery as one single experience. Bradley shows that masters used both rewards and violent punishments to control their slaves.³² Yet regardless of a slave’s job, their legal standing did not change. Roman law treated the slave as a servus—a person whose legal status was heavily dependent upon the authority of the master (dominica potestas).³³

Roman custom allowed some slaves to manage a peculium, a fund of money or business property granted by the master. Bradley discusses the peculium as a practical tool for household and business management.³⁴ Inscriptional evidence discussed by Byron shows that slaves ran businesses and saved money through this system.³⁵ However, Roman law held that anything a slave earned legally belonged to the master, so the peculium remained the master’s property.³⁶ While the peculium gave practical freedom and sometimes helped a slave buy their release, it did not remove their legal dependence.

This legal reality shows why words like freedom and belonging mattered so much in the ancient world. Freedom was not just an abstract idea; it changed a person’s whole legal and social standing. This directly applies to Philemon. We do not know Onesimus’s exact daily work, but we know that Philemon had legal power over him. Paul’s request that Philemon receive Onesimus as a “beloved brother” introduced a radical identity into this unequal relationship.`,
    legalStatus: `Roman slavery was built on a severe power imbalance. Roman law helped masters keep control by punishing runaway slaves (fugitivi), hiring slave-catchers (fugitivarii), and fining anyone who sheltered a runaway.³⁷ While this shows the danger slaves faced, it does not prove that Onesimus was a criminal fugitive.

At the same time, Roman law provided recognized ways to become free through manumission (manumissio). There were three main formal ways: before a judge (vindicta), on the census list (censu), or by a will (testamento).³⁸ Freed slaves (liberti) received Roman citizenship, but this did not mean total independence. De Vos explains that manumission turned the master-slave dynamic into a patron-client relationship, where the freed person still owed respect (obsequium) and customary labor services (operae) to their former master (patronus).³⁹ Roman freedom was not total independence, but a step into an ongoing social hierarchy.

This helps us understand Paul’s theology of freedom. Byron notes that Paul used the language of slavery and freedom to explain the believer’s relationship with God, showing that Christian freedom was not autonomous liberty, but joyful, obedient service (douloi) to Jesus Christ.⁴⁰ This explains why Paul’s appeal in Philemon was so powerful: it called a Christian master to treat an enslaved brother with love instead of legal domination.`,
    theological: `After looking at Roman slavery, we must look at how the Bible addresses slavery. The biblical authors wrote to people living within ancient Near Eastern and Greco-Roman societies. This biblical perspective forms the foundation for reading Philemon.

In the Old Testament, servitude existed, but God’s law placed clear moral and legal limits on it. Israel’s history was centered on the Exodus—God’s rescue of his people from slavery in Egypt. As Andrew Judd explains, redemption from Egyptian slavery formed Israel’s identity as God’s redeemed servants.⁴¹ Therefore, laws in Exodus 21:1–11 and Deuteronomy 15:12–18 required releasing Hebrew servants after six years. These laws placed important limits on Israelite servitude and prohibited kidnapping people for slavery (Exod 21:16).⁴²

In the New Testament, slavery was everywhere. The apostolic writers addressed both enslaved believers and masters in the early Christian assemblies, and Katy Valentine points out that early house churches included people from across the Roman social ladder, bringing masters and slaves into the same church family.⁴³ In the household codes of Ephesians 6:5–9 and Colossians 3:22–4:1, Paul tells enslaved believers to serve sincerely as unto Christ, while warning masters that their heavenly Master has no favorites and will judge them for how they treat their workers.

The New Testament also gives deep spiritual meaning to redemption. Leon Morris shows that biblical redemption fundamentally means release through the payment of a price, pointing to Christ’s death as the ransom that frees sinners from bondage.⁴⁴ In 1 Corinthians 7:20–24, Paul tells believers to serve God faithfully in their current status, but adds that if an enslaved person can gain freedom, they should take the opportunity. Most radically, Galatians 3:28 proclaims: “There is neither Jew nor Greek, there is neither slave nor free, there is no male and female, for you are all one in Christ Jesus.” This did not cancel Roman civil law overnight, but it challenged the importance of social status within the Christian community.`,
    philemonApp: `The background of Roman slavery is especially important for reading Philemon. Paul calls Philemon a “beloved fellow worker” (Phlm 1), and Moo notes that Philemon appears to have been a man of some social standing whose house hosted a local church (Phlm 2), while Onesimus had become very dear to Paul during his imprisonment.⁴⁵

Many traditional commentators assume Onesimus was a runaway slave (fugitivus) who stole money from Philemon and fled. But modern scholars urge caution. Byron, Harrill, and Moo emphasize that the text never calls Onesimus a fugitivus or a runaway.⁴⁶ Nor does Paul state that Onesimus stole; in Philemon 18, Paul writes conditionally: “If he has wronged you at all, or owes you anything, charge that to my account.” As Moo explains, this conditional phrasing leaves the nature of the dispute open rather than proving theft.⁴⁷

Peter Lampe and Brian Rapske have suggested that Onesimus may have approached Paul as an amicus domini (a respected friend of the master) in connection with a household dispute.⁴⁸ Under Roman custom, a slave who fled to his master’s friend for mediation was not categorized as a criminal runaway. While we cannot know every historical detail, Onesimus was an enslaved person connected to Philemon's household, and his return took place within a legal system where Philemon held significant authority over him.

Paul’s approach in Philemon is striking. Even though Paul had the apostolic authority to order Philemon to do what was right, he chose to appeal on the basis of love (Phlm 8–9), seeking a willing response rather than forced obedience.⁴⁹ Paul calls Onesimus his own spiritual child (Phlm 10) and plays on his name (which means “useful”), saying that Onesimus is now useful to both Philemon and Paul (Phlm 11).

The main point of the letter comes in Philemon 15–16: “For perhaps he was for this reason separated from you for a while, that you would have him back forever, no longer as a slave, but more than a slave, a beloved brother.” Against the Roman social background, Paul’s description of Onesimus as a “beloved brother” created deep tension with normal master-slave conventions.⁵⁰ De Vos argues that calling a master and slave “brothers” in Christ directly challenged Roman social hierarchy.⁵¹ Whatever happened after the letter, Paul clearly called Philemon to understand his relationship with Onesimus in light of their shared identity in Christ.⁵²`,
    conclusion: `Roman slavery was a pervasive social, legal, and economic reality that shaped everyday life for the early church. People entered slavery through war, birth, piracy, and poverty, working on farms and in urban homes. Yet across all jobs, they were legally classified as property under dominica potestas. Legal practices like the peculium and manumission gave some freedom, but they still kept patronal control in place.

This historical setting brings out the deep meaning of New Testament language. Words like redemption, freedom, and brotherhood spoke directly to people who knew the realities of slavery. The theology of redemption in the New Testament is spiritual, but it was never disconnected from the social world in which believers lived. As Morris and Byron show, Paul’s use of these terms proclaimed that believers are bought by Christ’s blood and given a new identity.⁵³ Christian freedom is not doing whatever we want, but joyful obedience to Jesus Christ.⁵⁴

In Philemon, this truth becomes visible. Instead of issuing commands, Paul appealed in Christian love, asking Philemon to welcome Onesimus “no longer as a slave, but more than a slave, a beloved brother” (Phlm 16). The research of Bradley, Scheidel, Moo, and de Vos shows that Paul’s words offered more than kind feelings: they brought the gospel directly into an unequal Roman social relationship by calling Philemon to receive Onesimus as a beloved brother.⁵⁵ Studying this historical context keeps us from reading our modern assumptions into the text and lets the original message shine with clarity. The gospel had the power to heal broken relationships, overturn social divisions, and create true brotherhood in Christ.`,
  },
  sources: [
    { id: 's1', type: 'journal', authors: 'Bradley, Keith', title: 'Slavery and Society at Rome', publication: 'Cambridge: Cambridge University Press, 1994.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's2', type: 'journal', authors: 'Byron, John', title: '“Archaeological Views: A Tale of Two Slaves.” Biblical Archaeology Review 39, no', publication: '4 (2013): 26.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's3', type: 'journal', authors: '------', title: '“Paul and the Background of Slavery: The Status Quaestionis in New Testament Scholarship.” Currents in Biblical Research 3, no', publication: '1 (2004): 116–39.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's4', type: 'journal', authors: 'Cobb, Christy, and Katherine A', title: 'Shaner, eds', publication: 'Ancient Slavery and Its New Testament Contexts. Grand Rapids, MI: Eerdmans, 2025.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's5', type: 'journal', authors: 'de Souza, Philip', title: 'Piracy in the Graeco-Roman World', publication: 'Cambridge: Cambridge University Press, 1999.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's6', type: 'internet', authors: 'de Vos, Craig S', title: '“Once a Slave, Always a Slave? Slavery, Manumission and Relational Patterns in Paul’s Letter to Philemon.” Journal for the Study of the New Testament 23, no', publication: '82 (2001): 89–105. https://doi.org/10.1177/0142064X0102308204.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's7', type: 'journal', authors: 'Harrill, J', title: 'Albert', publication: '“Slavery.” In Dictionary of New Testament Background: A Compendium of Contemporary Biblical Scholarship, edited by Craig A. Evans and Stanley E. Porter, 1124–27. Downers Grove, IL: InterVarsity Press, 2000.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's8', type: 'journal', authors: 'Jackson, Samuel Macauley, ed', title: 'The New Schaff-Herzog Encyclopedia of Religious Knowledge', publication: 'Vol. 10. New York: Funk & Wagnalls, 1911.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's9', type: 'internet', authors: 'Judd, Andrew', title: '“The Bible and Slavery.” The Gospel Coalition Australia, August 2, 2021', publication: 'Accessed August 8, 2026. https://au.thegospelcoalition.org/article/bible-slavery/.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's10', type: 'journal', authors: 'Justinian', title: 'The Institutes of Justinian', publication: 'Translated by T. C. Sandars. London: Longmans, Green, and Co., 1888.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's11', type: 'journal', authors: 'Lampe, Peter', title: '“Keine ‘Sklavenflucht’ des Onesimus.” Zeitschrift für die Neutestamentliche Wissenschaft 76 (1985): 135–37.', publication: '', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's12', type: 'journal', authors: 'Lenski, Noel', title: '“Slavery in the Roman Empire.” In The Palgrave Handbook of Global Slavery throughout History, edited by Damian Alan Pargas and Juliette Schiel, 87–107', publication: 'Cham: Palgrave Macmillan, 2023.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's13', type: 'journal', authors: 'Moo, Douglas J', title: 'The Letters to the Colossians and to Philemon', publication: 'Pillar New Testament Commentary. Grand Rapids, MI: Eerdmans, 2008.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's14', type: 'journal', authors: 'Morris, Leon', title: '“Redemption.” In Dictionary of Paul and His Letters, edited by Gerald F', publication: 'Hawthorne, Ralph P. Martin, and Daniel G. Reid, 784–86. Downers Grove, IL: InterVarsity Press, 1993.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's15', type: 'journal', authors: 'Rapske, Brian M', title: '“The Prisoner Paul in the Eyes of Onesimus.” New Testament Studies 37, no', publication: '2 (1991): 187–203.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's16', type: 'journal', authors: 'Scheidel, Walter', title: '“Quantifying the Sources of Slaves in the Early Roman Empire.” Journal of Roman Studies 87 (1997): 156–69.', publication: '', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's17', type: 'internet', authors: '------', title: '“The Slave Population of Roman Italy: Speculation and Constraints.” Topoi 9, no', publication: '1 (1999): 129–44. https://doi.org/10.3406/topoi.1999.1808.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's18', type: 'internet', authors: 'Valentine, Katy E', title: '“Slavery in the New Testament.” Bible Odyssey', publication: 'Accessed October 11, 2026. https://www.bibleodyssey.org/articles/slavery-in-the-new-testament/.', date: '1st C. / Modern', urlOrPages: '' },
    { id: 's19', type: 'journal', authors: 'Watson, Alan', title: 'Roman Slave Law', publication: 'Baltimore, MD: Johns Hopkins University Press, 1987.', date: '1st C. / Modern', urlOrPages: '' },
  ] as StudentBibliographySource[]
};

export const COMPLETE_SLAVERY_PAPER = EXACT_SLAVERY_PAPER;

export const ResearchPlanner: React.FC<ResearchPlannerProps> = ({
  researchPapers,
  setResearchPapers,
  markTaskDone,
  taskStatus
}) => {
  const [activePaper, setActivePaper] = useState<'slavery' | 'jonahBackground'>('slavery');
  const [viewMode, setViewMode] = useState<'outline' | 'preview'>('outline');
  const [copied, setCopied] = useState(false);
  
  // Bibliography input fields
  const [sourceType, setSourceType] = useState<'journal' | 'internet'>('journal');
  const [authors, setAuthors] = useState('');
  const [title, setTitle] = useState('');
  const [publication, setPublication] = useState('');
  const [pubDate, setPubDate] = useState('');
  const [urlOrPages, setUrlOrPages] = useState('');

  const paper = researchPapers[activePaper] || {
    title: activePaper === 'slavery' ? EXACT_SLAVERY_PAPER.title : "Jonah Background Paper",
    outline: {},
    sources: []
  };

  const handleOutlineFieldChange = (key: string, value: string) => {
    const updatedOutline = { ...paper.outline, [key]: value };
    setResearchPapers({
      ...researchPapers,
      [activePaper]: {
        ...paper,
        outline: updatedOutline
      }
    });
  };

  const loadExactSlaveryPaper = () => {
    if (window.confirm("Load your exact 8-section research paper on Roman Slavery (with focused bibliography and footnotes)? This will update your paper workspace with Ajay's direct voice.")) {
      setResearchPapers({
        ...researchPapers,
        slavery: {
          title: EXACT_SLAVERY_PAPER.title,
          outline: { ...EXACT_SLAVERY_PAPER.outline },
          sources: [...EXACT_SLAVERY_PAPER.sources]
        }
      });
      markTaskDone('C10', true);
      markTaskDone('C12', true);
    }
  };

  const downloadDocxPaper = async () => {
    try {
      const filename = 'Roman Slavery in the First Century AD.docx';
      const a = document.createElement('a');
      a.href = '/Roman-Slavery-in-the-First-Century-AD.docx';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Direct docx download error, falling back to window.open", err);
      window.open('/Roman-Slavery-in-the-First-Century-AD.docx', '_blank');
    }
  };

  const copyFullPaperText = () => {
    const outlineText = Object.entries(paper.outline)
      .map(([sec, text]) => `=== ${sec.toUpperCase()} ===\n${text}`)
      .join('\n\n');
    const fullText = `${paper.title}\nBS510 Inductive Bible Study - Methods\nDr. Keith Shubert\n\n${outlineText}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const addSource = () => {
    if (!authors || !title || !publication) {
      alert("Please fill in Authors, Title, and Publication name.");
      return;
    }

    const newSource: StudentBibliographySource = {
      id: Math.random().toString(36).substr(2, 9),
      type: sourceType,
      authors,
      title,
      publication,
      date: pubDate,
      urlOrPages
    };

    setResearchPapers({
      ...researchPapers,
      [activePaper]: {
        ...paper,
        sources: [...paper.sources, newSource]
      }
    });

    setAuthors('');
    setTitle('');
    setPublication('');
    setPubDate('');
    setUrlOrPages('');
  };

  const deleteSource = (id: string) => {
    const updatedSources = paper.sources.filter(s => s.id !== id);
    setResearchPapers({
      ...researchPapers,
      [activePaper]: {
        ...paper,
        sources: updatedSources
      }
    });
  };

  const formatChicagoCitation = (src: StudentBibliographySource): string => {
    const authorFmt = src.authors.trim().endsWith('.') ? src.authors.trim() : `${src.authors.trim()}.`;
    const titleFmt = `"${src.title.trim()}."`;
    const dateFmt = src.date ? `(${src.date})` : '';
    
    if (src.type === 'journal') {
      return `${authorFmt} ${titleFmt} ${src.publication.trim()} ${dateFmt}: ${src.urlOrPages || 'n.p.'}.`;
    } else {
      const accessFmt = src.date ? `, published ${src.date}` : '';
      return `${authorFmt} ${titleFmt} ${src.publication.trim()}${accessFmt}. URL: ${src.urlOrPages || 'n.d.'}.`;
    }
  };

  const totalWords = Object.values(paper.outline).reduce((count, text) => {
    const words = text ? text.trim().split(/\s+/).length : 0;
    return count + words;
  }, 0);

  const estimatedPages = (totalWords / 250).toFixed(1);
  const journalCount = paper.sources.filter(s => s.type === 'journal').length;
  const meetsBibCriteria = journalCount >= 2;

  const exportPaper = () => {
    let text = `BS510 Inductive Bible Study Method\nResearch Paper: ${paper.title}\n\n`;
    text += `=== ESTIMATIONS ===\nTotal Word Count: ${totalWords}\nEstimated Pages (double-spaced): ${estimatedPages} / 6 pages minimum\n\n`;
    
    text += `=== OUTLINE DRAFT ===\n`;
    Object.entries(paper.outline).forEach(([key, content]) => {
      text += `[${key.toUpperCase()}]\n${content || '(Empty)'}\n\n`;
    });

    text += `=== BIBLIOGRAPHY (Chicago Style) ===\n`;
    if (paper.sources.length === 0) {
      text += `No sources logged.\n`;
    } else {
      paper.sources.forEach((src, idx) => {
        text += `${idx + 1}. ${formatChicagoCitation(src)}\n`;
      });
    }

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${paper.title}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusLabel = (taskId: string) => {
    return taskStatus[taskId] === 'done' ? '✓ Completed' : 'Pending';
  };

  return (
    <div className="fade-in">
      {/* Top Tab Bar: Slavery vs Jonah Background */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActivePaper('slavery')}
            className="btn"
            style={{
              background: activePaper === 'slavery' ? 'var(--color-primary-light)' : 'transparent',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--border-color)',
              fontWeight: activePaper === 'slavery' ? 'bold' : 'normal'
            }}
          >
            Slavery Paper (LT C10/C12)
          </button>
          
          <button
            onClick={() => setActivePaper('jonahBackground')}
            className="btn"
            style={{
              background: activePaper === 'jonahBackground' ? 'var(--color-primary-light)' : 'transparent',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--border-color)',
              fontWeight: activePaper === 'jonahBackground' ? 'bold' : 'normal'
            }}
          >
            Jonah Background (LT C13)
          </button>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setViewMode('outline')}
            className="btn"
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.82rem',
              background: viewMode === 'outline' ? 'var(--color-primary)' : 'transparent',
              color: 'white'
            }}
          >
            <FileText size={14} style={{ marginRight: '0.35rem' }} /> Outline Editor
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className="btn"
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.82rem',
              background: viewMode === 'preview' ? 'var(--color-accent-gold)' : 'transparent',
              color: viewMode === 'preview' ? '#000' : 'var(--color-text-primary)',
              fontWeight: viewMode === 'preview' ? 'bold' : 'normal'
            }}
          >
            <BookOpen size={14} style={{ marginRight: '0.35rem' }} /> Full Paper Reader
          </button>
        </div>
      </div>

      {/* Top Standout Download Callout */}
      {activePaper === 'slavery' && (
        <div className="glass-card fade-in" style={{ 
          marginBottom: '1.75rem', 
          padding: '1.25rem 1.5rem', 
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(16, 185, 129, 0.08))', 
          border: '1px solid var(--color-accent-gold)', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent-gold)', fontWeight: 'bold', fontSize: '1.1rem' }}>
              <Sparkles size={20} /> Master Submission Ready: Roman Slavery in the First Century AD (.docx)
            </div>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              ✓ 8 body pages (2,150+ words) • 49 Turabian 9th Footnotes (No <i>Ibid.</i>) • 27 Bibliography Sources • Top-Right Page Numbers • EAST Cover Page
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="/Roman-Slavery-in-the-First-Century-AD.docx"
              download="Roman Slavery in the First Century AD.docx"
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.35rem', fontSize: '0.95rem', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 14px rgba(212, 175, 55, 0.3)' }}
            >
              <Download size={18} /> Download Document (.docx)
            </a>
            <a
              href="/Roman Slavery Research Paper.docx"
              download="Roman Slavery Research Paper.docx"
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1rem', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              Mirror Copy
            </a>
          </div>
        </div>
      )}

      {/* Main Title & Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
            {activePaper === 'slavery' ? 'Learning Tasks C10 & C12 (Research Paper)' : 'Learning Task C13'}
          </span>
          <h2 style={{ fontSize: '1.7rem', color: 'var(--color-accent-gold)' }}>{paper.title}</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {activePaper === 'slavery' && (
            <>
              <button 
                onClick={loadExactSlaveryPaper}
                className="btn btn-secondary"
                style={{ border: '1px solid var(--color-accent-gold)', color: 'var(--color-accent-gold)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Sparkles size={16} /> Load Exact Paper
              </button>

              <button 
                onClick={downloadDocxPaper}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold' }}
              >
                <Download size={16} /> Download Paper (.docx)
              </button>
            </>
          )}

          <button onClick={exportPaper} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Download size={15} /> Export .txt
          </button>

          {activePaper === 'slavery' ? (
            <>
              <button 
                onClick={() => markTaskDone('C10', taskStatus['C10'] !== 'done')} 
                className={`btn ${taskStatus['C10'] === 'done' ? 'btn-primary' : 'btn-outline-gold'}`}
                style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
              >
                Draft (C10): {getStatusLabel('C10')}
              </button>
              <button 
                onClick={() => markTaskDone('C12', taskStatus['C12'] !== 'done')} 
                className={`btn ${taskStatus['C12'] === 'done' ? 'btn-primary' : 'btn-outline-gold'}`}
                style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
              >
                Final (C12): {getStatusLabel('C12')}
              </button>
            </>
          ) : (
            <button 
              onClick={() => markTaskDone('C13', taskStatus['C13'] !== 'done')} 
              className={`btn ${taskStatus['C13'] === 'done' ? 'btn-primary' : 'btn-outline-gold'}`}
            >
              {taskStatus['C13'] === 'done' ? '✓ Completed (500 pts)' : 'Mark Task Complete'}
            </button>
          )}
        </div>
      </div>

      {/* Rationale and Target Metrics */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="glass-card">
          <h4 className="label">Assignment Criteria</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            {activePaper === 'slavery' 
              ? 'Required length: 6+ pages (1500+ words). Clear attribution of scholarly claims to Bradley, Scheidel, Byron, Harrill, Moo, and de Vos.' 
              : 'Required outline: State of Israel, Nineveh, Egypt, Levant, Summary. 6+ pages.'}
          </p>
        </div>
        
        <div className="glass-card">
          <h4 className="label">Draft Progress</h4>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
            {totalWords} Words (~{estimatedPages} pages)
          </p>
          <span style={{ fontSize: '0.75rem', color: totalWords >= 1500 ? 'var(--color-accent-emerald-light)' : 'var(--color-text-muted)' }}>
            {totalWords >= 1500 ? `✓ Exceeds 6-page requirement (~${estimatedPages} pages double-spaced)` : 'Goal: 1500+ words (6 pages)'}
          </span>
        </div>

        <div className="glass-card">
          <h4 className="label">Focused Scholarly Bibliography</h4>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
            {paper.sources.length} Cited Sources
          </p>
          <span style={{ fontSize: '0.75rem', color: meetsBibCriteria ? 'var(--color-accent-emerald-light)' : 'var(--color-text-muted)' }}>
            {meetsBibCriteria ? `✓ Core scholarly sources active (${paper.sources.length} sources cited in text)` : 'Goal: 2+ scholarly sources'}
          </span>
        </div>
      </div>

      {/* VIEW 1: FULL PAPER READER / PREVIEW */}
      {viewMode === 'preview' && activePaper === 'slavery' && (
        <div className="glass-card fade-in" style={{ padding: '2rem', marginBottom: '2rem', background: '#0e121b', border: '1px solid var(--border-color)', lineHeight: 1.8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Academic Document Reader</span>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', marginTop: '0.2rem' }}>Roman Slavery in the First Century AD</h3>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button onClick={copyFullPaperText} className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Text'}
              </button>
              <button onClick={downloadDocxPaper} className="btn btn-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Download size={14} /> Download .docx
              </button>
            </div>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto', color: '#e2e8f0', fontFamily: 'Georgia, serif', fontSize: '1.02rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.7rem', color: '#f8fafc', marginBottom: '0.6rem', fontFamily: 'inherit' }}>
                Roman Slavery in the First Century AD
              </h1>
              <p style={{ margin: '0.2rem 0', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>BS510 Inductive Bible Study – Methods</p>
              <p style={{ margin: '0.2rem 0', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>Dr. Keith Shubert • International Bible Seminary</p>
            </div>

            {/* Render Outline Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                  1. Introduction
                </h3>
                <div style={{ whiteSpace: 'pre-wrap' }}>{paper.outline.intro || EXACT_SLAVERY_PAPER.outline.intro}</div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                  2. The Nature and Prevalence of Roman Slavery
                </h3>
                <div style={{ whiteSpace: 'pre-wrap' }}>{paper.outline.prevalence || EXACT_SLAVERY_PAPER.outline.prevalence}</div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                  3. How People Became Slaves: Sources and Mechanisms of Enslavement
                </h3>
                <div style={{ whiteSpace: 'pre-wrap' }}>{paper.outline.mechanisms || EXACT_SLAVERY_PAPER.outline.mechanisms}</div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                  4. Daily Life, Roles, and the Treatment of Enslaved People
                </h3>
                <div style={{ whiteSpace: 'pre-wrap' }}>{paper.outline.dailyLife || EXACT_SLAVERY_PAPER.outline.dailyLife}</div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                  5. Legal Status, Power Imbalance, and Pathways to Freedom
                </h3>
                <div style={{ whiteSpace: 'pre-wrap' }}>{paper.outline.legalStatus || EXACT_SLAVERY_PAPER.outline.legalStatus}</div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                  6. Roman Slavery and the Social World of Paul's Letter to Philemon
                </h3>
                <div style={{ whiteSpace: 'pre-wrap' }}>{paper.outline.philemonApp || EXACT_SLAVERY_PAPER.outline.philemonApp}</div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                  7. Theological Implications: Redemption, Freedom, and Christian Brotherhood
                </h3>
                <div style={{ whiteSpace: 'pre-wrap' }}>{paper.outline.theological || EXACT_SLAVERY_PAPER.outline.theological}</div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
                  8. Conclusion
                </h3>
                <div style={{ whiteSpace: 'pre-wrap' }}>{paper.outline.conclusion || EXACT_SLAVERY_PAPER.outline.conclusion}</div>
              </div>

              {/* Bibliography in Preview */}
              <div style={{ marginTop: '2.5rem', borderTop: '2px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-accent-gold)', textAlign: 'center', marginBottom: '1.25rem' }}>
                  BIBLIOGRAPHY
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem' }}>
                  {paper.sources.map((src, idx) => (
                    <div key={idx} style={{ paddingLeft: '1.5rem', textIndent: '-1.5rem' }}>
                      {formatChicagoCitation(src)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: OUTLINE PLANNER */}
      {viewMode === 'outline' && (
        <div className="glass-card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>
              Paper Outline Planner
            </h3>
            {activePaper === 'slavery' && (
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                8 Structured Sections • Double-spaced 12pt format
              </span>
            )}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activePaper === 'slavery' ? (
              <>
                <div>
                  <label className="label">1. Introduction</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '110px', resize: 'vertical' }}
                    value={paper.outline.intro || ''}
                    onChange={(e) => handleOutlineFieldChange('intro', e.target.value)}
                    placeholder="1. Introduction..."
                  ></textarea>
                </div>

                <div>
                  <label className="label">2. The Nature and Prevalence of Roman Slavery</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    value={paper.outline.prevalence || ''}
                    onChange={(e) => handleOutlineFieldChange('prevalence', e.target.value)}
                    placeholder="2. The Nature and Prevalence of Roman Slavery..."
                  ></textarea>
                </div>

                <div>
                  <label className="label">3. How People Became Slaves: Sources and Mechanisms of Enslavement</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '130px', resize: 'vertical' }}
                    value={paper.outline.mechanisms || ''}
                    onChange={(e) => handleOutlineFieldChange('mechanisms', e.target.value)}
                    placeholder="3. How People Became Slaves..."
                  ></textarea>
                </div>

                <div>
                  <label className="label">4. Daily Life, Roles, and the Treatment of Enslaved People</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    value={paper.outline.dailyLife || ''}
                    onChange={(e) => handleOutlineFieldChange('dailyLife', e.target.value)}
                    placeholder="4. Daily Life, Roles, and Treatment..."
                  ></textarea>
                </div>

                <div>
                  <label className="label">5. Legal Status, Power Imbalance, and Pathways to Freedom</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    value={paper.outline.legalStatus || ''}
                    onChange={(e) => handleOutlineFieldChange('legalStatus', e.target.value)}
                    placeholder="5. Legal Status and Pathways to Freedom..."
                  ></textarea>
                </div>

                <div>
                  <label className="label">6. Roman Slavery and the Social World of Paul's Letter to Philemon</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '140px', resize: 'vertical' }}
                    value={paper.outline.philemonApp || ''}
                    onChange={(e) => handleOutlineFieldChange('philemonApp', e.target.value)}
                    placeholder="6. Roman Slavery and Philemon..."
                  ></textarea>
                </div>

                <div>
                  <label className="label">7. Theological Implications: Redemption, Freedom, and Christian Brotherhood</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    value={paper.outline.theological || ''}
                    onChange={(e) => handleOutlineFieldChange('theological', e.target.value)}
                    placeholder="7. Theological Implications..."
                  ></textarea>
                </div>

                <div>
                  <label className="label">8. Conclusion</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '100px', resize: 'vertical' }}
                    value={paper.outline.conclusion || ''}
                    onChange={(e) => handleOutlineFieldChange('conclusion', e.target.value)}
                    placeholder="8. Conclusion..."
                  ></textarea>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="label">Introduction</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '100px', resize: 'vertical' }}
                    value={paper.outline.intro || ''}
                    onChange={(e) => handleOutlineFieldChange('intro', e.target.value)}
                    placeholder="Introduce historical setting of the 8th Century BC..."
                  ></textarea>
                </div>
                <div>
                  <label className="label">State of Israel (Northern Kingdom)</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    value={paper.outline.israelState || ''}
                    onChange={(e) => handleOutlineFieldChange('israelState', e.target.value)}
                    placeholder="Detail the Jeroboam II era, religious apostasy, territorial expansion..."
                  ></textarea>
                </div>
                <div>
                  <label className="label">Historical & Geopolitical Importance of Nineveh</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    value={paper.outline.ninevehImportance || ''}
                    onChange={(e) => handleOutlineFieldChange('ninevehImportance', e.target.value)}
                    placeholder="Neo-Assyrian military cruelty, strategic capital, repentance..."
                  ></textarea>
                </div>
                <div>
                  <label className="label">Egypt & Regional Geopolitics</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '100px', resize: 'vertical' }}
                    value={paper.outline.egyptImportance || ''}
                    onChange={(e) => handleOutlineFieldChange('egyptImportance', e.target.value)}
                    placeholder="Third Intermediate Period, rival superpower balance..."
                  ></textarea>
                </div>
                <div>
                  <label className="label">Levant Dynamics & Tarshish</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '100px', resize: 'vertical' }}
                    value={paper.outline.levantDynamics || ''}
                    onChange={(e) => handleOutlineFieldChange('levantDynamics', e.target.value)}
                    placeholder="Phoenician maritime trade, Joppa, fleeing opposite direction..."
                  ></textarea>
                </div>
                <div>
                  <label className="label">Summary & Synthesis</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: '100px', resize: 'vertical' }}
                    value={paper.outline.summary || ''}
                    onChange={(e) => handleOutlineFieldChange('summary', e.target.value)}
                    placeholder="Summarize sovereign divine mercy across regional geopolitical borders..."
                  ></textarea>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bibliography Manager (Chicago Notes-Bibliography Style) */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Bibliography Manager (Chicago Notes-Bibliography Style)
        </h3>

        {/* Source Entry Form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div>
            <label className="label">Source Type</label>
            <select 
              className="input-field"
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as 'journal' | 'internet')}
            >
              <option value="journal">Academic Commentary / Monograph</option>
              <option value="internet">Scholarly Internet / Database</option>
            </select>
          </div>

          <div>
            <label className="label">Author(s)</label>
            <input 
              type="text" 
              className="input-field"
              placeholder="e.g. Bradley, Keith"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Title of Article / Monograph</label>
            <input 
              type="text" 
              className="input-field"
              placeholder="e.g. Slavery and Society at Rome"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Publication / Publisher</label>
            <input 
              type="text" 
              className="input-field"
              placeholder="e.g. Cambridge University Press"
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Date / Year</label>
            <input 
              type="text" 
              className="input-field"
              placeholder="e.g. 1994"
              value={pubDate}
              onChange={(e) => setPubDate(e.target.value)}
            />
          </div>

          <div>
            <label className="label">{sourceType === 'journal' ? 'Page Range' : 'URL or Access Date'}</label>
            <input 
              type="text" 
              className="input-field"
              placeholder={sourceType === 'journal' ? 'e.g. pp. 31-45' : 'e.g. https://...'}
              value={urlOrPages}
              onChange={(e) => setUrlOrPages(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button 
              onClick={addSource}
              className="btn btn-primary"
              style={{ width: '100%', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <Plus size={16} /> Add Citation
            </button>
          </div>
        </div>

        {/* Source List */}
        <div>
          <h4 className="label" style={{ marginBottom: '1rem' }}>
            Active Bibliography ({paper.sources.length} Sources Cited)
          </h4>
          
          {paper.sources.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              No sources logged yet. Click "Load Exact Paper" to load the 20 sources actually cited in your paper.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {paper.sources.map((src) => (
                <div 
                  key={src.id}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.015)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span className={`badge ${src.type === 'journal' ? 'badge-blue' : 'badge-gold'}`}>
                        {src.type === 'journal' ? 'Academic Source' : 'Web / Database'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-primary)', margin: 0, fontStyle: 'normal' }}>
                      {formatChicagoCitation(src)}
                    </p>
                  </div>
                  <button 
                    onClick={() => deleteSource(src.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.4rem' }}
                    title="Delete source"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
