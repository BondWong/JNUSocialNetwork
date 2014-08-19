package model.communityOwnerFeature;

import model.Community;
import model.Member;

public interface CommunityOwnerFeature {

	public void removeMember(Community community, Member member);

	public void createCommunity(Member member, Community community);

}
