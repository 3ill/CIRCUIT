import React from 'react';
import SearchForm from '@/components/SearchForm';
import ExploreCard from '@/components/ExploreCard';
import { proposals } from '@/app/constants';

const page = () => {
  return (
    <section className="flex-center paddings mx-auto w-full flex-col max-w-screen-2xl">
      <section className="nav-padding">
        <SearchForm />

        <div className="grid grid-cols-2 max-xs:grid-cols-1">
          {proposals.map((proposal: any) => (
            <div key={proposal.id}>
              <ExploreCard
                id={proposal.id}
                title={proposal.title}
                address={proposal.proposer}
                userTier={proposal.userTier}
                votes={proposal.voteCount}
                description={proposal.description}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default page;
