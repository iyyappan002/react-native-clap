import { useLastMonthAchieversQuery } from "@/api/queries";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AcheiverCard from "./AcheiverCard";

function AcheiversList() {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useLastMonthAchieversQuery();

  const achievers = useMemo(() => {
    return data?.pages?.at(0)?.lastMonthAchievers?.slice(0, 5) ?? [];
  }, [data?.pages]);
  console.log({ achievers, data: data?.pages });

  return (
    <View style={styles.container}>
      <View style={styles.lastMonthCard}>
        <View style={styles.lastMonthtitle}>
          <Text style={styles.lastMonthText}>Last Month Achievers</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <ScrollView horizontal>
          {achievers.map((achiever) => (
            <AcheiverCard key={achiever.id.toString()} acheiver={achiever} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  lastMonthCard: {
    backgroundColor: "white",
    padding: 20,
  },
  lastMonthtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  lastMonthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
    color: "#2B93E7",
  },
});

export default AcheiversList;
