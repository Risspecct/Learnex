package users.rishik.Learnex.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import users.rishik.Learnex.Models.GameScore;

@Repository
public interface GameScoreRepository extends JpaRepository<GameScore, Long> {
}