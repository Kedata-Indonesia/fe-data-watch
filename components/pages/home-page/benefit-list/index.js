import { useState } from 'react';
import Image from 'next/image';

const benefitItems = [
  {
    id: '1',
    title: '<span class="text-c-red-600">Enhanced</span> Data Accuracy',
    content:
      'Ensure the integrity of your data with our free data quality tool. Detect and rectify inaccuracies, minimizing errors and improving overall data quality.',
  },
  {
    id: '2',
    title: '<span class="text-c-red-600">Streamlined</span> Data Validation',
    content:
      'Simplify the data validation process with rule-based automation. Define custom rules to automatically identify and flag data inconsistencies, saving you time and effort.',
  },
  {
    id: '3',
    title: '<span class="text-c-red-600">Improved</span> Decision-Making',
    content:
      'Make data-driven decisions confidently. Our tool empowers you to work with clean and reliable data, enabling more accurate analyses and insights for informed decision-making.',
  },
  {
    id: '4',
    title: 'Time and Cost <span class="text-c-red-600">Saving</span>',
    content:
      'Reduce manual data cleaning and validation tasks. Our open-source Micro SaaS automates repetitive processes, allowing you to focus on higher-value activities and increasing operational efficiency.',
  },
  {
    id: '5',
    title: '<span class="text-c-red-600">Scalability</span> and Flexibility',
    content:
      'Seamlessly scale your data quality efforts as your business grows. Our tool is designed to handle large datasets and can adapt to evolving data management requirements.',
  },
];

const BenefitList = () => {
  const [benefitId, setBenefitId] = useState('1');
  return (
    <div className="flex gap-10">
      <div className="relative hidden w-6/12 max-w-[460px] md:block lg:h-[460px]">
        <Image
          alt={`benefit-${benefitId}`}
          src={`/images/benefit-${benefitId}.png`}
          style={{ objectFit: 'contain' }}
          fill
        />
      </div>
      <div className="w-full md:w-6/12">
        {benefitItems.map(item => (
          <div
            key={item.id}
            className="collapse-plus collapse rounded-none border-b-2 border-b-[#FFE5EA] last:border-0 md:border-0"
          >
            <input
              type="radio"
              name="benefits"
              title={item.content}
              defaultChecked={item.id == 1 ? true : false}
              onClick={() => setBenefitId(item.id)}
            />
            <div
              className="collapse-title font-archivo font-bold"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
            <div className="collapse-content flex flex-col items-center gap-4">
              <Image
                alt={`benefit-${benefitId}`}
                src={`/images/benefit-${benefitId}.png`}
                height={200}
                width={200}
                className="md:hidden"
              />
              <p className="text-[10px] md:text-base">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitList;
