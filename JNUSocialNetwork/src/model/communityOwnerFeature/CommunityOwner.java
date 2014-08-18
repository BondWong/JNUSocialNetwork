package model.communityOwnerFeature;

import model.Community;
import model.Member;

public class CommunityOwner implements CommunityOwnerFeature {

	@Override
	public void removeMember(Community community, Member member) {
		// TODO Auto-generated method stub
		member.leaveCommunity(community);
	}

	@Override
	public void createCommunity(Member owner, Community community) {
		// TODO Auto-generated method stub
		community.setOwner(owner);
		owner.getCreatedCommunities().add(community);
	}

}
